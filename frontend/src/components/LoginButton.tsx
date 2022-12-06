import Enact from "../Enact";


function logout(){
  (async () => {const loggedout = await fetch('/api/auth/logout');
                location.pathname = '/campus'
                })();
}
export default function LoginButton() {
     let output =  document.createElement('div') as HTMLElement

     (async () => {
        const res = await fetch("/api/auth");
    
        if (res.ok) {
          const {email, firstName, id, lastName} = await res.json();

          output.innerHTML = 
            `<div>
              <button
              class = "btn btn-primary"
              type="button"
              href = ''
              >
              Hello ${firstName} ${lastName}!
              </button>

              <button
              class = "btn btn-primary"
              type="button"
              href = '/login'
              onClick= "someplaceholder cause im stupid"
              >
                Log Out
              </button>
            </div>`
            
          } else {
            console.log("here");
            output.innerHTML = 
              `<button>
                Log In
              </button>`
            
          }   
     }
     )();
     return output
}