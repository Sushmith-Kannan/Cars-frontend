import axios from "axios";
import { useState } from "react";

function PersonalInformation() {
    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [licenseNumber, setLicenseNumber] = useState(null);
    const [address, setAddress] = useState(null);
    // const [identityFile, setIdentityFile] = useState(null);
    // const [profilePhoto, setProfilePhoto] = useState(null);

    const handleSubmit = async ($event) => {
        $event.preventDefault();

        console.log("Full Name:", fullName);
        console.log("Email:", email);
        console.log("Phone Number:", phoneNumber);
        console.log("License Number:", licenseNumber);
        console.log("Address:", address);
        // console.log("Identity File:", identityFile);
        // console.log("Profile Photo:", profilePhoto);

        let obj = {
             'name': fullName,
             'email': email,
             'number': phoneNumber,
             'licno': licenseNumber,
             'address':address
        }
        let response = await axios.post('http://localhost:8080/api/addpersonal', obj);
 

        console.log(response)
    }

    return (
        <div className="container mt-5">
            <h3>Car Renter Registration</h3>
            <form onSubmit={($event) => handleSubmit($event)}>
                <h5 className="mt-4">Personal Information</h5>

                <div className="mb-3">
                    <label>Full Name:</label>
                    <input type="text"
                        className="form-control"
                        onChange={($event) => setFullName($event.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Email Address:</label>
                    <input type="email"
                        className="form-control"
                        onChange={($event) => setEmail($event.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Phone Number:</label>
                    <input type="tel"
                        className="form-control"
                        onChange={($event) => setPhoneNumber($event.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Driver's License Number:</label>
                    <input type="text"
                        className="form-control"
                        onChange={($event) => setLicenseNumber($event.target.value)} />
                </div>

                <div className="mb-3">
                    <label>Address:</label>
                    <input type="text"
                        className="form-control"
                        onChange={($event) => setAddress($event.target.value)} />
                </div>

                {/* <div className="mb-3">
                    <label>Identity Verification:</label>
                    <input type="file"
                        className="form-control"
                        onChange={($event) => setIdentityFile($event.target.files[0])} />
                </div>

                <div className="mb-3">
                    <label>Profile Photo:</label>
                    <input type="file"
                        className="form-control"
                        onChange={($event) => setProfilePhoto($event.target.files[0])} />
                </div> */}

                <div className="d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-outline-secondary">Cancel</button>
                    <input type="submit" value="Continue to Car Details" className="btn btn-dark" />
                </div>
            </form>
        </div>
    );
}

export default PersonalInformation;
