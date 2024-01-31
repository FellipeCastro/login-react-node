import { useState } from "react"

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [user, setUser] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()
        console.log(email, password)

        try {
            const response = await axios.post('http://localhost:3000/login', 
                JSON.stringify({email, password}),
                {
                    Headers: { 'Content-Type': 'application/json' }
                }    
            )

            setUser(response.data)
        } catch (error) {
            if (!error?.response) {
                setError('Erro ao acessar o servidor!')
            } else if (error.response.status == 401) {
                setError('Usuario ou senha inválidos')
            }
        }


    }

    const handleLogout = async (e) => {
        e.preventDefault()
        setUser(null)
        setError('')
    }
    
    return (
      <div className="login-form-wrap">
        {user == null ? (
            <div>
                <h2>Login</h2>
                <form className="login-form" autoComplete="off">
                <input type="email" name="email" id="email" placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" id="password" placeholder='Senha' required onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className='btn-login' onClick={(e) => handleLogin(e)}>Login</button>
                </form>
                <p>{error}</p>
            </div>
        ) : (
            <div>
                <h2>Olá, {user.name}</h2>
                <button type="button" className="btn-login" onClick={(e) => handleLogout(e)}>Logout</button>
            </div>
        )}

      </div>
    )
}

export default Login
