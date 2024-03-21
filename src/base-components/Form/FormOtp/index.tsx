import clsx from "clsx";
import { useMemo } from "react";

interface FormOtpProps {
    value: string
    valueLength: number
    onChange: React.EventHandler<any> | undefined
    className?: string | undefined
}

const RE_DIGIT = new RegExp(/^\d+$/);

const FormOtp = (props: FormOtpProps) => {

    const valueItems = useMemo(() => {
        const valueArray = props.value.split('');
        const items: Array<string> = [];
  
        for (let i = 0; i < props.valueLength; i++) {
          const char = valueArray[i];
  
          if (RE_DIGIT.test(char)) {
            items.push(char);
          } else {
            items.push('');
          }
        }
  
        return items;
      }, [props.value, props.valueLength]);

      const focusToNextInput = (target: HTMLElement) => {
        const nextElementSibling =
          target.nextElementSibling as HTMLInputElement | null;
  
        if (nextElementSibling) {
          nextElementSibling.focus();
        }
      };
      const focusToPrevInput = (target: HTMLElement) => {
        const previousElementSibling =
          target.previousElementSibling as HTMLInputElement | null;
  
        if (previousElementSibling) {
          previousElementSibling.focus();
        }
      };
      const inputOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number
      ) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);
  
        if (!isTargetValueDigit && targetValue !== '') {
          return;
        }
  
        const nextInputEl = target.nextElementSibling as HTMLInputElement | null;
  
        // only delete digit if next input element has no value
        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
          return;
        }
  
        targetValue = isTargetValueDigit ? targetValue : ' ';
  
        const targetValueLength = targetValue.length;
  
        if (targetValueLength === 1) {
          const newValue =
            props.value.substring(0, idx) + targetValue + props.value.substring(idx + 1);
  
          props.onChange!(newValue);
  
          if (!isTargetValueDigit) {
            return;
          }
  
          focusToNextInput(target);
        } else if (targetValueLength === props.valueLength) {
          props.onChange!(targetValue);
  
          target.blur();
        }
      };
      const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const target = e.target as HTMLInputElement;
  
        if (key === 'ArrowRight' || key === 'ArrowDown') {
          e.preventDefault();
          return focusToNextInput(target);
        }
  
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
          e.preventDefault();
          return focusToPrevInput(target);
        }
  
        const targetValue = target.value;
  
        // keep the selection range position
        // if the same digit was typed
        target.setSelectionRange(0, targetValue.length);
  
        if (e.key !== 'Backspace' || targetValue !== '') {
          return;
        }
  
        focusToPrevInput(target);
      };
      const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { target } = e;
  
        // keep focusing back until previous input
        // element has value
        const prevInputEl =
          target.previousElementSibling as HTMLInputElement | null;
  
        if (prevInputEl && prevInputEl.value === '') {
          return prevInputEl.focus();
        }
  
        target.setSelectionRange(0, target.value.length);
      };

      return (
        <div className={clsx([
            "flex items-center cursor-text",
            props.className
        ])}>
            {
             valueItems.map((digit, idx)=> (
                <input 
                    type='text' 
                    key={idx}
                    onChange={(e) => inputOnChange(e, idx)} 
                    value={digit} 
                    onKeyDown={inputOnKeyDown} 
                    onFocus={inputOnFocus} 
                    inputMode="numeric" 
                    autoComplete="one-time-code" 
                    maxLength={props.valueLength} 
                    pattern="\d{1}" 
                    className={clsx([
                        "w-[25px] flex-1 text-[1.2rem] mx-1 text-center font-regular py-3 border-slate-700/10 focus:border-[1px] border-[1px] relative top-[2px] focus:border-primary select-none rounded-xl text-black outline-none bg-transparent transition-all duration-500 ease-in-out"
                    ])}
                />
            ))
           }
        </div>
      )

}

export default FormOtp;

