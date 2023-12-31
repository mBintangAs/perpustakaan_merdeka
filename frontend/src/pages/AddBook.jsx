import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import Alert from "../partials/Alert";

export default function AddBook() {
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [bookFile, setBookFile] = useState(null);
    const [alert, setAlert] = useState([])



    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        // Check the file type
        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                // If it's an image file, set as cover image
                setCoverImage(selectedFile);
            }
            if (selectedFile.type === 'application/pdf') {
                // If it's a PDF file, set as book file
                setBookFile(selectedFile);
            }
        }
    };

    const addbook = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('categorie_id', category);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('quantity', quantity);
            formData.append('cover', coverImage); // Assuming coverImage is a File object
            formData.append('book', bookFile);   // Assuming bookFile is a File object

            const res = await axios.post('/books', formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('key'),
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(res);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = Object.values(error.response.data.errors).map((errorArray) => {
                    return errorArray.map((errorMsg) => ({ type: "danger", message: errorMsg }));
                }).flat();

                setAlert(errorMessages);
            } else {
                console.log(error.response.data);
                setAlert([{ type: "danger", message: "An unexpected error occurred." }]);
            }
        }
    };

    useEffect(() => {
        load()
        async function load() {
            try {
                const res_categories = await axios.get('/categories', { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
                let categories = [];
                res_categories.data.map((e) => categories.push({ value: e.id, label: e.name }))
                setCategories(categories)
            } catch (error) {

            }
        }
    }, [])
    return (
        <>
            <form onSubmit={addbook}>
                <div className="container-fluid pt-4 px-4">
                    <div className="col-12 card shadow p-4">
                        {alert.length > 0 && alert.map((alert, index) => (
                            <Alert key={index} color={alert.type} message={alert.message} />
                        ))}
                        <p className="">Categories</p>
                        <Select onChange={(e) => setCategory(e.value)} options={categories}></Select>
                        <div className="form-floating my-3">
                            <input
                                type="text"
                                className="form-control"
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                                required
                                placeholder=""
                            />
                            <label htmlFor="floatingInput">Judul Buku</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder=""
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                id="DeskripsiBuku" style={{ height: 150 }} />
                            <label htmlFor="DeskripsiBuku">Deskripsi Buku</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control"
                                onChange={e => setQuantity(e.target.value)}
                                value={quantity}
                                required
                                placeholder=""
                            />
                            <label htmlFor="floatingInput">Jumlah Buku</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cover_buku_file" className="form-label">Cover Buku</label>
                            <input className="form-control" accept="image/*" onChange={handleFileChange} type="file" id="cover_buku_file" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pdf_buku_file" className="form-label">File Buku</label>
                            <input className="form-control" type="file" accept="application/pdf" id="pdf_buku_file" onChange={handleFileChange} />
                        </div>
                        <div className="d-flex justify-content-between">

                            <button className="btn  btn-primary text-light" >
                                Submit
                            </button>
                            <NavLink to={'/books'}>

                            <button className="btn  btn-secondary text-light" >
                                Kembali
                            </button>
                            </NavLink>
                        </div>
                    </div>

                </div>
            </form>
        </>
    )
}