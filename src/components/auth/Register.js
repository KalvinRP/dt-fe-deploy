import { useMutation } from 'react-query';
import { API } from '../../config/api';

const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  
const { email, password } = form;

const handleSubmit = useMutation(async (e) => {
try {
    e.preventDefault();

    const config = {
    headers: {
        'Content-type': 'application/json',
    },
    };

    const body = JSON.stringify(form);

    const response = await API.post('/register', body, config);

} catch (error) {
    const alert = (
    <Alert variant="danger" className="py-1">
        Failed
    </Alert>
    );
    setMessage(alert);
    console.log(error);
}
});