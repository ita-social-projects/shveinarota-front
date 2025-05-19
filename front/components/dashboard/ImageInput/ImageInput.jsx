import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Image from "next/image";

export default function ImageInput({ placeholder = "Посилання на зображення з Google Drive", image, setImage }) {
    const handleChange = (value) => {
        const match = value.match(/[-\w]{25,}/);
        return match ? match[0] : "";
    };

    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Зображення</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder={placeholder}
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </InputGroup>
            </Form.Group>

            <Image
                src={`http://drive.google.com/uc?export=view&id=${handleChange(image)}`}
                alt="logo"
                width={200}
                height={60}
                className="mb-3"
            />
        </>
    );
}
