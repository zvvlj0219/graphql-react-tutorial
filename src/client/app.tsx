import { Link } from "react-router-dom"
import RouterContent from "./components/RouterContents"
import styles from './styles/app.modules.css'

const App = () => {
    return (
        <div className={`app `}>
            <header className={styles.header}>
                <h3 className={styles.logo}>
                    create todo app
                </h3>
            </header>
            <main className={styles.main}>
                <RouterContent/>
            </main>
            <footer className={styles.footer}>
                <h4>@todo app</h4>
            </footer>
        </div>
    )
}

export default App