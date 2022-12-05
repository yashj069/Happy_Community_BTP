import { Fragment } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './styles.css';
import background from '../../images/background.png';

function UnauthenticatedApp() {
    const { login } = useAuth();

    return (
        <div style={{ backgroundImage: `url(${background})` ,height:"100vh", width:"100vw", backgroundRepeat:'no-repeat',backgroundSize:"cover"}}>
            <div className='subDiv'>
                <h2 className='homePageHeading1'>Join our community and be happy!</h2>
                <div>
                    <button onClick={login} className="login">
                        Sign in with Google+
                    </button>
                </div>
            </div>
        </div>
    );
}

export { UnauthenticatedApp };
