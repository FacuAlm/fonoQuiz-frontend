export default function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    const day = date.getDate() ; // Los días en JavaScript son base 0
    const month = date.getMonth() + 1; // Los meses en JavaScript son base 0
    const year = date.getFullYear();
  
    // Asegurarse de que los valores tengan dos dígitos
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }