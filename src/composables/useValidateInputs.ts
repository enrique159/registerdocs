export const useValidateInputs = () => {

  const validateInput = (evt: any, regex: RegExp) => {
    let theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  };

  const validateNumbers = (evt: any) => validateInput(evt, /[0-9]/);
  const validateLetters = (evt: any) => validateInput(evt, /[a-zA-Z]/);
  const validatePassword = (evt: any) => validateInput(evt, /[a-zA-Z0-9!@#$%^&*()]/);

  return {
    validateLetters,
    validateNumbers,
    validatePassword,
  };
}