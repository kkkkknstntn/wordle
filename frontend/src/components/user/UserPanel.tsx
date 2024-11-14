import UserForm from '../user/UserForm'



const UserPanel = () => {
  return (
    <div className="mainPanel">
      <h1 className="title">W O R D L E</h1>
      <h2 className="subtitle">У вас есть 6 попыток угадать слово из 5 букв.</h2>
      <UserForm />
    </div>
  );
}

export default UserPanel;
