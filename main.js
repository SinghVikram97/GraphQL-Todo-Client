const GRAPHQL_API='http://localhost:4000/'
const todosElement=document.querySelector('#todos');
const form=document.querySelector('form');
const titleInput=document.querySelector('#title')
const query=`{
    allTodos{
      id
      title
      done
    }
  }`;

fetch(GRAPHQL_API,{
  method:'POST',
  body:JSON.stringify({
    query
  }),
  headers:{
    'content-type':'application/json'
  }
})
.then(res=>res.json())
.then((data)=>{
  const todos=data.data.allTodos;
  console.log(todos);
  todosElement.innerHTML=todos.reduce((html,todos)=>{
    return html+`<li>${todos.title}</li>`;
  },'')
})

form.addEventListener('submit',(event)=>{
  event.preventDefault();
  const title=titleInput.value;
  const query=`
    mutation{
    createTodo(title:"${title}",done:false){
      id
      title
      done
    }
  }`;
  fetch(GRAPHQL_API,{
    method:'POST',
    body:JSON.stringify({
      query
    }),
    headers:{
      'content-type':'application/json'
    }
  })
  .then(res=>res.json())
  .then(result=>{
    console.log(result);
    todosElement.innerHTML+=`<li>${title}</li>`
  })
})