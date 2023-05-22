import { useRef} from "react";
import emailjs from '@emailjs/browser';
import "./style/Contact.css";
import Swal from "sweetalert2";
// npm install @emailjs/browser

const Contact = () =>{
    const form=useRef()
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_6n8js5q', 'template_ychp5pb', form.current, 'RJMjYDZbbv_3wFrq6')
          .then((result) => {
            Swal.fire(
                'Your email was sent',
                'Thank you for contacting us!',
                'success'
              )
          }, (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
          });
          e.target.reset()
      };
    return(
        <section>
            <div className='contact-wrap'>
                <h2 className='text-center'>Contact Us</h2>
                <form ref={form} onSubmit={sendEmail}
                    className="contact-form">
                    <input type="text" placeholder='Full Name' name='user_name' required></input>
                    <input type="text" placeholder='Email' name='user_email'required></input>
                    <input type="text" placeholder='Subject' name='subject'required></input>
                    <textarea name="message" id="message" cols='30' rows='10'></textarea>
                    <button type='submit' className="contactSubmitButton">Send message</button>
                </form>
            </div>
        </section>
    )
}

export default Contact