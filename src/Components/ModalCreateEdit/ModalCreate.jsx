import './ModalCreate.css';

import React from 'react';

import InputCreate from '../Inputs/InputCreate';
import SelectCreate from '../Selects/SelectCreate';

const ModalCreate = ({ createAct, typesInp, setAct, act, typNa, cit }) => {
  return (
    <dialog className="dialogCreate">
      <div className="mainDialog">
        <div className="divDialog2">
          <h2>Create Activity</h2>
          <div className="divForm">
            <form onSubmit={(ev) => createAct(ev)}>
              {typesInp.map((info) => (
                <InputCreate
                  info={info}
                  key={info}
                  action={(ev) => {
                    setAct({ ...act, [info]: ev.target.value });
                  }}
                />
              ))}
              <div className="inputGroup">
                <input
                  className="input"
                  onChange={(ev) => {
                    setAct({
                      ...act,
                      location: ev.target.value,
                      coordinates: ev.target.value,
                    });
                  }}
                  type="text"
                  placeholder="calle numero codigo postal y municipio"
                />
                <label htmlFor="name">Location</label>
              </div>
              <div className="divImageCreate">
                <p>Añade tu imagen:</p>
                <input
                  className="input-create-Img"
                  onChange={(ev) => {
                    setAct({ ...act, image: ev.target.files[0] });
                  }}
                  type="file"
                  id="file-input"
                  style={{ display: 'none' }}
                />

                <button
                  className="button-file-create"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <img
                    className="imgCreatePerfilOne"
                    src={
                      act.image
                        ? URL.createObjectURL(act.image)
                        : 'https://cdn-icons-png.flaticon.com/512/16/16410.png'
                    }
                    alt="icono de fotografia"
                  />
                </button>
              </div>
              <div className="selectsCreate">
                <SelectCreate
                  options={typNa}
                  action={(ev) => setAct({ ...act, type: ev.target.value })}
                />

                <SelectCreate
                  options={cit}
                  action={(ev) => setAct({ ...act, city: ev.target.value })}
                />
              </div>
              <div className="button-create-footer">
                <button
                  onClick={(ev) => {
                    ev.target.offsetParent.open = false;
                    document.getElementById('resetButton').click();
                  }}
                  className="perfil-button-act"
                >
                  Crear
                </button>
                <input
                  type="reset"
                  id="resetButton"
                  value="reset"
                  className="perfil-button-act"
                ></input>
              </div>
            </form>
          </div>
          <button
            onClick={(ev) => (ev.target.offsetParent.open = false)}
            className="perfil-button-act"
          >
            Cerrar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ModalCreate;
