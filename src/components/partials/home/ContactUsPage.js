import React, {Component} from 'react'

export default class ContactUsPage extends Component {
  componentDidMount() {
    this.fixHeight()
  }
  fixHeight() {
    let el = document.getElementById('contactus')
    let container = el.getElementsByClassName('container')[0]
    if (window.innerWidth <= 768) {
      if (container.offsetTop <= 150) {
        container.style.marginTop = '150px'
        container.style.height = (window.innerHeight - 20) - 150 + 'px'
        container.style.overflow = 'auto'
      }
    }
  }
  render() {
    return (
      <div className='root-container' id='contactus'>
        <div className='container'>
          <div className='row contactus-row' id='contactus-row'>
            <div className='col-lg-6 d-none d-lg-block'>
              <div className='contactus-about'>
                <h5 className='contactus-about-title'>Ask how we can help you:</h5>
                <div className='contactus-about-desc-item'>
                  <h6 className='font-weight-bold'>See our platform in actions</h6>
                  <p>Lorem</p>
                </div>
                <div className='contactus-about-desc-item'>
                  <h6 className='font-weight-bold'>See our platform in actions</h6>
                  <p>Lorem</p>
                </div>
                <div className='contactus-about-desc-item'>
                  <h6 className='font-weight-bold'>See our platform in actions</h6>
                  <p>Lorem</p>
                </div>
                <h5 className='contactus-about-title'>Ask how we can help you:</h5>
              </div>
            </div>
            <div className='col-12 col-lg-6'>
              <div className='contactus-form'>
                <p>Plase note: all fields are required</p>
                <div className='form-group'>
                  <label htmlFor="first_name">
                    First Name
                  </label>
                  <input type="text" className='form-control' id='first_name'/>
                </div>
                <div className='form-group'>
                  <label htmlFor="last_name">
                    Last Name
                  </label>
                  <input type="text" className='form-control' id='last_name'/>
                </div>
                <div className='form-group'>
                  <label htmlFor="job_title">
                    Job Title
                  </label>
                  <input type="text" className='form-control' id='job_title'/>
                </div>
                <div className='form-group'>
                  <label htmlFor="phone_number">
                    Phone Number
                  </label>
                  <input type="text" className='form-control' id='phone_number'/>
                </div>
                <div className='form-group'>
                  <label htmlFor="country">
                    Country
                  </label>
                  <select className='form-control' id='country'>
                    <option value="">Select</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor="comment">
                    Comment
                  </label>
                  <textarea id='comment' className='form-control' />
                </div>
                <div className='form-group form-check'>
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type='button' className='btn btn-primary btn-block'>
                  SEND MESSAGES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
