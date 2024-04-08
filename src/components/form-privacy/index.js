import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { formStage, formPrivacy } from '../../store/rootSlice'
import './styles.scss';

function FormUserPrivacy({ pageTitle, submitButtonText, previousButton }) {

  const dispatch = useDispatch();

  const currentStage = useSelector(state => state.FormStage) 
  const stateSignup1 = useSelector(state => state.FormUserPrivacy.signup1)
  const stateSignup2 = useSelector(state => state.FormUserPrivacy.signup2)

  const state = useSelector(state => state)
  const stateOutput = (`JSON Data Form-Privacy: ${JSON.stringify(state, null, 2)}`)
  
  const [isChecked1, setIsChecked1] = useState(stateSignup1 || false); 
  const [isChecked2, setIsChecked2] = useState(stateSignup2 || false); 
  const handleChange1 = (e) => {  
    setIsChecked1(!isChecked1);
  }
  const handleChange2 = (e) => {
    setIsChecked2(!isChecked2);
  }
  const [isSubmitted, setIsSubmitted] = useState(false) 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setIsSubmitted(true) 
  }

  useEffect(() => {
    if (isSubmitted) { 

      dispatch(
        formStage(3) 
      )
      dispatch(
        formPrivacy({
          signup1: isChecked1, 
          signup2: isChecked2
        })
      );

    }

  }, [isSubmitted, dispatch, stateOutput, isChecked1, isChecked2])

  return (

    <>
        <h2>{pageTitle || 'Privacy'}</h2>
          
        <form 
          name="form-privacy"
          id="form-privacy"
          onSubmit={handleSubmit}
        >
      
        <p className="form-boxes">
          <input 
            type="checkbox" 
            id="signup1"
            name="signup1"
            onChange={handleChange1}
            checked={isChecked1}
          />
          <label htmlFor="signup1">Receive updates by email</label>
        </p>

        <p className="form-boxes">
          <input 
            type="checkbox" 
            id="signup2"
            name="signup2"
            onChange={handleChange2}
            checked={isChecked2}
          />
          <label htmlFor="signup2">Receive communication by our team</label>
        </p>

        <div className="btn-array">
          {(previousButton) && 
            <p>
              <input 
                  type="submit" 
                  value={`Back`}
                  onClick={() => dispatch(formStage(currentStage-1))}
                />
            </p>
          }
          <p>
            <input 
              type="submit" 
              value={ submitButtonText || 'Submit' } 
            />
          </p>
        </div>
    
      </form>
    
    </>

  );

}

export default FormUserPrivacy;
