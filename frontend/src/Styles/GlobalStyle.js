import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
  box-sizing:border-box;
  margin:0;
 
}
body{
  background:${({ theme }) => theme.colour.background};
  color:${({ theme }) => theme.colour.bodyText};
  font-family:'Poppins';
  font-weight:500;
  font-size:1rem;
  

}
h1,h2,h3, a{
font-weight:700;
}

h1{
  font-size:64px;
}

h2{
  font-size:40px;
}

h3{
  font-size:24px;
}

span{
  font-weight:14px;
}

a{
  text-decoration:underline;
  font-size:16px;
  color:${({ theme }) => theme.colour.link}
}

button { 
  
  background-color:${({ theme }) => theme.colour.primary};
  color:${({ theme }) => theme.colour.white};
  border: none;
  padding: 12px 24px;
  border-radius:8px;
  font-size: 16px;
  text-decoration:none;
  text-transform:uppercase;
  font-weight:700;
}

input{
  background-color:${({ theme }) => theme.colour.inputField};
  font-size:14px;
  width:320px;
  border:none;
  padding:14px;
  border-radius:8px;
  color:${({ theme }) => theme.colour.bodyText};
}

`;

export default GlobalStyle;
