export const validatePhoneNumber = (event) => {
    const input = event.target;
    const key = event.key;

    if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || /^[0-9]$/.test(key)) {
      return input.value;
    } else {
      event.preventDefault();
    }
};

export const validateNumeric = (event) => {
    const input = event.target;
    const key = event.key;

    if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || /^[0-9]$/.test(key)) {
      return input.value;
    } else {
      event.preventDefault();
    }
};

export const validateAlphaNumeric = (event) => {
  const input = event.target;
  const key = event.key;

  if (
      key === 'Backspace' || 
      key === 'Delete' || 
      key === 'ArrowLeft' || 
      key === 'ArrowRight' || 
      /^[a-zA-Z0-9]$/.test(key)
  ) {
      return input.value;
  } else {
      event.preventDefault();
  }
};

export const changeLabelFilter = (val) =>{
  let labelFIlterImpact="Risk Score"

  if(val=="&filter[]=where,risk_score,>=,9"){
      labelFIlterImpact="Critical"
  }else if(val=="&filter[]=where,risk_score,<,9&filter[]=where,risk_score,>=,6"){
      labelFIlterImpact="High"
  }else if(val=="&filter[]=where,risk_score,<,6&filter[]=where,risk_score,>=,3"){
      labelFIlterImpact="Medium"
  }else if(val=="&filter[]=where,risk_score,<=,2"){
      labelFIlterImpact="Low"
  }

  return labelFIlterImpact;
}


export const formatTglIndo = (val) =>{

  let date = new Date(val);


  let day = date.getUTCDate();
  let monthIndex = date.getUTCMonth(); 
  let year = date.getUTCFullYear();


  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];


  let month = months[monthIndex];


  let formattedDate = `${day} ${month} ${year}`;

  return formattedDate
}