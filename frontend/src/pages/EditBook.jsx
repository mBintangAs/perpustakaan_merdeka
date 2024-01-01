import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import Alert from "../partials/Alert";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function EditBook() {
    const titleParams = useParams().title;

    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState({});
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true)
    const [idBook, setIdBook] = useState("")
    const [linkBookFile, setLinkBookFile] = useState('');
    const [bookFile, setBookFile] = useState(null);
    const [alert, setAlert] = useState([])
    const navigate = useNavigate()



    useEffect(() => {
        async function load() {
            try {
                const res_categories = await axios.get('/categories', { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
                let categories = [];
                res_categories.data.map((e) => categories.push({ value: e.id, label: e.name }))
                setCategories(categories)
                const res_book = await axios.get('/books/' + titleParams, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
                setCategory(res_book.data.categorie_id)
                setTitle(res_book.data.title)
                setDescription(res_book.data.description)
                setQuantity(res_book.data.quantity)
                setIdBook(res_book.data.id)
                setLinkBookFile(res_book.data.book_file)
                const res_img_cover = await axios.get('/cover-book?filename=' + res_book.data.cover_file, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') }, responseType: "blob" })
                // Membuat URL objek dari blob
                console.log(res_img_cover);
                const url = window.URL.createObjectURL(new Blob([res_img_cover.data]));
                // Menemukan elemen gambar dan mengatur sumbernya ke URL
                const img = document.getElementById('cover-buku');
                img.src = url;
            } catch (error) {

            }
        }
        load()

    }, [])

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

    const editBook = async (e) => {
        e.preventDefault();
        if (isDisabled) {
            return setIsDisabled(false);
        }
        try {
            const formData = new FormData();
            formData.append('categorie_id', category);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('quantity', quantity);
            if (coverImage != null) {
                formData.append('cover', coverImage); // Assuming coverImage is a File object
            }
            if (coverImage != null) {
                formData.append('cover', coverImage); // Assuming coverImage is a File object
            }
            if (bookFile != null) {
                formData.append('book', bookFile);   // Assuming bookFile is a File object
            }
            console.log(formData);
            const res = await axios.post('/books/' + idBook, formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('key'),
                    'Content-Type': 'multipart/form-data',
                },
            });
            const MySwal = withReactContent(Swal)

            MySwal.fire({
                title: "Successfully Update Books",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok"
            })
            navigate('/books')

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

    async function download(filename) {
        try {
            let urlTarget = axios.defaults.baseURL + `file-book?filename=${linkBookFile}&token=` + localStorage.getItem('key')
            window.open(urlTarget, '_blank');
        } catch (error) {

        }
    }
    return (
        <>
            <form onSubmit={editBook}>
                <div className="container-fluid pt-4 px-4">
                    <div className="col-12 card shadow p-4">
                        {alert.length > 0 && alert.map((alert, index) => (
                            <Alert key={index} color={alert.type} message={alert.message} />
                        ))}
                        <p className="">Categories</p>
                        <Select value={categories.filter(option => option.value == category)} required={true} isDisabled={isDisabled} disabled onChange={(e) => setCategory(e.value)} options={categories}></Select>
                        <div className="form-floating my-3">
                            <input
                                disabled={isDisabled}
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
                                disabled={isDisabled}
                                onChange={e => setDescription(e.target.value)}
                                id="DeskripsiBuku" style={{ height: 150 }} />
                            <label htmlFor="DeskripsiBuku">Deskripsi Buku</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                disabled={isDisabled}
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
                            {isDisabled ?
                                <div className="w-100 mb-3">
                                    <img alt="cover-buku" style={{ width: "100%", objectFit: "cover" }} id="cover-buku" />
                                </div>
                                : <input className="form-control"
                                    disabled={isDisabled}
                                    accept="image/*" onChange={handleFileChange} type="file" id="cover_buku_file" />
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pdf_buku_file" className="form-label">File Buku</label>
                            {isDisabled ?
                                <div className="mb-3">
                                    <button onClick={()=>download()} className="btn btn-primary"><i className="fas fa-download"></i> Unduh</button>
                                </div> :
                                <input className="form-control"
                                    disabled={isDisabled}
                                    type="file" accept="application/pdf" id="pdf_buku_file" onChange={handleFileChange} />
                            }</div>
                        <div className="d-flex justify-content-between">

                            <button className="btn  btn-primary text-light" >
                                {isDisabled ? "Ubah" : "Submit"}
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