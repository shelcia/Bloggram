import{r as d,v as w,w as m,m as I,p as S,j as e,R as b,A as $,x as c,y as f,I as A,z as L,E as y,L as P,q,F as E,P as n,G as C,H as N,J as u}from"./index-cd888a92.js";const z=()=>{const[i,h]=d.useState(!1),[s,g]=d.useState({name:"",email:"",password:""}),r=a=>{g({...s,[a.target.name]:a.target.value})};let x=w({name:m().matches(/^[a-zA-Z]+$/,"Please enter a valid name with only alphabetical characters").required("name is required"),email:m().email("must be a valid email").required("email is required"),password:m().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,"Password must be 8 characters or more, with at least one uppercase letter, one lowercase letter, and one digit").required("password is required")});const[p,l]=d.useState(!1),v=I(),j=()=>{l(!0),x.validate(s).then(()=>{s.name&&localStorage.setItem(`${n}Email`,s.email);const a=s;C.post(a,"register").then(t=>{l(!1),t.status==="200"?(N.set(`${n}Token`,t.token,{expires:6/24}),localStorage.setItem(`${n}UserId`,t.userId),localStorage.setItem(`${n}name`,t.name),localStorage.setItem(`${n}uname`,t.uname),u.success("Signup succesfull"),v("/dashboard"),location.reload()):(u.error(t.message),localStorage.removeItem(`${n}Email`))})}).catch(a=>{console.log(a),l(!1),u.error(a.errors.toString())})},o=S("(min-width:600px)");return e.jsx(b.Fragment,{children:e.jsxs($,{title:"Signup",children:[e.jsx(c,{label:"Name",variant:"standard",sx:{minWidth:o?450:200},name:"name",value:s.name,onChange:a=>r(a)}),e.jsx("br",{}),e.jsx(c,{label:"Email",variant:"standard",className:"mt-4",sx:{minWidth:o?450:200},name:"email",value:s.email,onChange:a=>r(a)}),e.jsx("br",{}),e.jsx(c,{label:"Password",variant:"standard",sx:{minWidth:o?450:200},className:"mt-4",name:"password",value:s.password,onChange:a=>r(a),type:`${i?"text":"password"}`,InputProps:{endAdornment:e.jsx(f,{position:"end",children:e.jsx(A,{onClick:()=>h(!i),edge:"end",children:i?e.jsx(L,{style:{color:"#4CAAF1"}}):e.jsx(y,{})})})}}),e.jsx("div",{className:"text-center mt-4",children:p?e.jsx(P,{loading:!0,loadingIndicator:"Loading...",variant:"outlined",size:"small",children:"Loading"}):e.jsx(q,{onClick:j,variant:"outlined",size:"small",children:"Signup"})}),e.jsxs("div",{className:"text-center mt-5",children:["Have an account already? then ",e.jsx(E,{to:"/login",children:"Login"})]})]})})};export{z as default};
