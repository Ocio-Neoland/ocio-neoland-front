import './Register.css';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { API } from '../../Services/API';

const Register = () => {
  const [shown, setShown] = useState(false);
  const [shown1, setShown1] = useState(false);

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [imgavatar, setImgAvatar] = useState(null);
  const [showImgavatar, setShowImgAvatar] = useState(null);
  const { register, handleSubmit } = useForm();

  const onChangeAvatar = (e) => {
    setImgAvatar(e.target.files[0]);
    setShowImgAvatar(URL.createObjectURL(e.target.files[0]));
  };

  let navigate = useNavigate();
  const formSubmit = (formData) => {
    let data;
    if (repeatPassword === formData.password) {
      data = {
        email: formData.email,
        userName: formData.userName,
        password: formData.password,
        avatar: imgavatar,
      };
    } else {
      data = {
        email: '',
        userName: '',
        password: '',
        avatar: '',
      };
    }

    API.post('/users', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(() => {
      navigate('/login');
    });
  };
  const switchShown1 = () => setShown1(!shown1);
  const switchShown = () => setShown(!shown);
  const onChange = ({ currentTarget }) => setPassword(currentTarget.value);
  return (
    <main className="main-register">
      <div className="containerRegister">
        <form className="form" onSubmit={handleSubmit(formSubmit)}>
          <span className="sub mb">Register to get full access now </span>

          <input
            type="file"
            id="file"
            {...register('avatar')}
            onChange={onChangeAvatar}
          />
          <div className="register-avatar">
            <label className="avatar" htmlFor="file">
              {showImgavatar != null && (
                <>
                  <img src={showImgavatar} alt="" className="imgAvatar" />
                </>
              )}
              {showImgavatar == null && (
                <>
                  {' '}
                  <span className="iconoImgAvatar">
                    <img
                      src="https://sistemas.com/wp-content/uploads/2013/12/twitpic.png"
                      alt="icono foto"
                    />
                  </span>
                </>
              )}

              <p className="ParrafoAvatar">avatar</p>
            </label>
          </div>

          <label className="username" htmlFor="userName">
            Username:
          </label>
          <input
            placeholder="Username"
            type="text"
            className="input"
            id="userName"
            name="userName"
            {...register('userName')}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="text"
            className="input"
            id="email"
            name="email"
            {...register('email')}
            placeholder="Email"
          />

          <label htmlFor="password">Password:</label>
          <input
            type={shown ? 'text' : 'password'}
            value={password}
            className="input"
            id="password"
            name="password"
            {...register('password')}
            onChange={onChange}
            placeholder="password"
          />
          <div className="register-div-register">
            {shown ? (
              <button
                type="button"
                onClick={switchShown}
                className="regiser-button-mostrar"
              >
                {' '}
                <img
                  className="ojoPassword"
                  src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679667868/fotos/ojo_aqmzwt.png"
                  alt="icono ojo"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={switchShown}
                className="regiser-button-mostrar"
              >
                {' '}
                <img
                  className="ojoPassword"
                  src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679667874/fotos/ojoCerrado_sy8jkw.png"
                  alt="icono ojo"
                />
              </button>
            )}
            <div className="passwordRequisitos">
              <p>min 8 characters,</p>
              <p>1 uppercase,</p>
              <p>1 symbol,</p>
              <p>1 number</p>
            </div>
          </div>
          <label htmlFor="password">repit Password:</label>
          <input
            placeholder="repeatPassword"
            type={shown1 ? 'text' : 'password'}
            className="input"
            id="repeatPassword"
            name="repeatPassword"
            onChange={(ev) => setRepeatPassword(ev.target.value)}
          />
          <div className="register-div-register">
            {shown1 ? (
              <button
                type="button"
                onClick={switchShown1}
                className="regiser-button-mostrar"
              >
                {' '}
                <img
                  className="ojoPassword"
                  src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679667868/fotos/ojo_aqmzwt.png"
                  alt="icono ojo"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={switchShown1}
                className="regiser-button-mostrar"
              >
                {' '}
                <img
                  className="ojoPassword"
                  src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679667874/fotos/ojoCerrado_sy8jkw.png"
                  alt="icono ojo"
                />
              </button>
            )}
          </div>
          <button className="button" type="submit">
            Register
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
