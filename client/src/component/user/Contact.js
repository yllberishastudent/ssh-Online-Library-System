import { useRef} from "react";
import emailjs from '@emailjs/browser';
// npm install @emailjs/browser

const Contact = () =>{
    const form=useRef()
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_6n8js5q', 'template_ychp5pb', form.current, 'RJMjYDZbbv_3wFrq6')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset()
      };
    return(
        <section>
            <div className='container'>
                <h2 className='--text-center'>Contact Us</h2>
                <form ref={form} onSubmit={sendEmail}
                    className="--form-control --card --flex-center --dir-column">
                    <input type="text" placeholder='Full Name' name='user_name' required></input>
                    <input type="email" placeholder='Email' name='user_email'required></input>
                    <input type="text" placeholder='Subject' name='subject'required></input>
                    <textarea name='message' cols='30' rows='10'></textarea>
                    <button type='submit' className="--btn --btn-primary">Send message</button>
                </form>
            </div>
        </section>
    )
}

export default Contact