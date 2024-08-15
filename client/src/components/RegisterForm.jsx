import { useState } from 'react';
import { registerUser } from '../helpers/api';
import { Form, Input, Button, message, Typography, Card } from 'antd';

const { Text } = Typography;

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        email: '',
        phone: '',
        profile_image: null,
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                handleChange('profile_image', file);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        try {
            setErrors([]);
            await registerUser(data);
            message.success('User registered successfully');
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error registering user:', error);
            }
        }
    };

    const validatePhone = (_, value) => {
        const phoneRegex = /^\d{11}$/;
        if (!value) {
            return Promise.reject(new Error('Phone number is required'));
        } else if (!phoneRegex.test(value)) {
            return Promise.reject(new Error('Phone number must be exactly 11 digits'));
        }
        return Promise.resolve();
    };

    const validateEmail = (_, value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            return Promise.reject(new Error('Email is required'));
        } else if (!emailRegex.test(value)) {
            return Promise.reject(new Error('Please enter a valid email address'));
        }
        return Promise.resolve();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
            <Card style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <Form onFinish={handleSubmit} layout="vertical">
                    <Form.Item label="First Name" required>
                        <Input
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={(e) => handleChange('first_name', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Last Name" required>
                        <Input
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={(e) => handleChange('last_name', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Middle Name">
                        <Input
                            name="middle_name"
                            placeholder="Middle Name"
                            value={formData.middle_name}
                            onChange={(e) => handleChange('middle_name', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        required
                        name="email"
                        rules={[{ validator: validateEmail }]}
                        validateTrigger="onBlur"
                    >
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        required
                        name="phone"
                        rules={[{ validator: validatePhone }]}
                        validateTrigger="onBlur"
                    >
                        <Input
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Profile Picture" required>
                        <div>
                            <Text>Profile Picture:</Text>
                            <input
                                onChange={handleImageChange}
                                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                type="file"
                                id="formFile"
                                accept=".jpg,.jpeg,.png"
                            />
                            <Text className="text-sm text-red-500">
                                Note: Please Upload a JPEG file that is 17KB or below.
                            </Text>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index} style={{ color: 'red' }}>
                                    {error.msg}
                                </li>
                            ))}
                        </ul>
                    )}
                </Form>
            </Card>
        </div>
    );
};

export default RegisterForm;
