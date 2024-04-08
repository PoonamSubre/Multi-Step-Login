import React from 'react';
import { useSelector } from 'react-redux'
import LazyLoad from 'react-lazyload';
import FormUserSignup from '../../components/form-signup'; 
import FormUserPrivacy from '../../components/form-privacy'; 
import FormUserCompleted from '../../components/form-completed';
import './styles.scss';

const Signup = () => {
  const pageStage = useSelector(state => state.FormStage)

  return (
    <main>
      <div className="form-wrapper">
        <h1 
          data-testid="Signup-Title" 
          className="text-center"
        >
          Signup Form
        </h1>
        
        <section>
          <LazyLoad once>
            <div className="progressbar">
              <div className={pageStage===1 ? 'progress-step progress-step-active' : 'progress-step'} data-title="User"></div>
              <div className={pageStage===2 ? 'progress-step progress-step-active' : 'progress-step'} data-title="Privacy"></div>
              <div className={pageStage===3 ? 'progress-step progress-step-active' : 'progress-step'} data-title="Done"></div>
            </div>
          </LazyLoad>

          <div className="page-wrapper">
            {(pageStage === 1) && 
              <LazyLoad once>
                <div className="wrap">
                  <FormUserSignup 
                    pageTitle={'User Form:'}
                    submitButtonText={'Next'}
                    previousButton={false}
                  />
                </div>
              </LazyLoad>
            }

            {(pageStage === 2) && 
              <LazyLoad once>
                <div className="wrap">
                  <FormUserPrivacy
                    pageTitle={'Privacy Form:'}
                    submitButtonText={'Next'}
                    previousButton={true}
                  />
                </div>
              </LazyLoad>
            }

            {(pageStage === 3) && 
              <LazyLoad once>
                <div className="wrap">
                  <FormUserCompleted 
                    pageTitle={'Success!'}
                    successMessage={'Please verify your email address, you should have received an email from us already!'}
                  />
                </div>
              </LazyLoad>
            }
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;
