import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { formStage, formSignup } from '../../store/rootSlice'
import './styles.scss';

function FormUserSignup({ pageTitle, submitButtonText, previousButton }) {
  const dispatch = useDispatch();

  const currentStage = useSelector(state => state.FormStage)
  const formstageName = useSelector(state => state.FormUserSignup.name)
  const formstageRole = useSelector(state => state.FormUserSignup.role)
  const formstageEmail = useSelector(state => state.FormUserSignup.email)
  const formstagePass = useSelector(state => state.FormUserSignup.password)

  const [formData, setFormData] = useState({
    name: formstageName || "",
    role: formstageRole || "",
    email: formstageEmail || "",
    password: formstagePass || "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData, 
      [name]: value
    })
  }

  const [errors, setErrors] = useState({})
  const validate = (formData) => {
    let formErrors = {}

    if(!formData.name){
      formErrors.name = "Name required";
    }

    const emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(!formData.email || !emailRegex.test(formData.email)) {
      formErrors.email = 'Valid Email required';
    }

    const passwordRegex = new RegExp('(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+(?=.{10,})')
    if(!formData.password || !passwordRegex.test(formData.password)) {
      formErrors.password = 'password length 10 characters and must contain at least 1 lowercase letter, 1 uppercase letter and 1 number)';
    }

    return formErrors
  }
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(formData))
    setIsSubmitted(true)
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      dispatch(
        formStage(2)
      )
      dispatch(
        formSignup({
          name: formData.name,
          role: formData.role,
          email: formData.email,
          password: formData.password
        })
      );
    }
  }, [formData, isSubmitted, dispatch, errors])

  return (
    <>
      <h2>{pageTitle || 'Signup'}</h2>
      <form 
        name="form-signup"
        id="form-signup"
        onSubmit={(e) => handleSubmit(e)}
      >
        <p>
          <label htmlFor="name">name<span className="required-asterix">*</span></label>
          <input 
            type="text"
            id="name" 
            name="name" 
            autoComplete="name" 
            aria-label="name"
            aria-required="true"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
          />
        </p>
        {errors.name && <span className="error-message">{errors.name}</span>}

        <p>
          <label htmlFor="role">role</label>
          <input 
            type="text"
            id="role" 
            name="role" 
            autoComplete="role" 
            aria-label="role"
            aria-required="false"
            placeholder="eg. software developer"
            value={formData.role}
            onChange={handleChange}
          />
        </p>

        <p>
          <label htmlFor="email">email<span className="required-asterix">*</span></label>
          <input 
            type="email" 
            id="email" 
            name="email"
            autoComplete="email" 
            aria-label="email"
            aria-required="true"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </p>
        {errors.email && <span className="error-message">{errors.email}</span>}

        <p>
          <label htmlFor="password">password<span className="required-asterix">*</span></label>
          <input 
            type="text"
            id="password" 
            name="password" 
            aria-label="password"
            aria-required="true"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
        </p>
        {errors.password && <span className="error-message">{errors.password}</span>}

        <p className="disclaimer-text"><span className="required-asterix">*</span> required fields</p>

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

export default FormUserSignup;
