import AuthorizationForm from '../user/AuthForm'

interface MainPanelInterface {
  showAuthForm : boolean
}

const MainPanel = () => {
  return (
    <div className="mainPanel">
      <h1 className="title">W O R D L E</h1>
      <h2 className="subtitle">У вас есть 6 попыток угадать слово из 5 букв.</h2>
      <AuthorizationForm />
    </div>
  );
}

export default MainPanel
