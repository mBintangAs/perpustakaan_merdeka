import axios from "axios"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Pagination from "../partials/Pagination"


export default function Book() {
    const search = useOutletContext()
    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [offsetScroll, setOffsetScroll] = useState(0);


    async function load(offset = 0) {
        try {
            const res_book = await axios.get(`/books?offset=${offset}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
            setBooks(res_book.data);
        } catch (error) {

        }
    }
    const performSearch = async (search, offset = 0) => {
        try {
            const res_search = await axios.post('/search/books', { q: search, type: "book", offset }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
            setBooks(res_search.data);
        } catch (error) {
            // console.error('Error during search:', error);
        }
    };
    const handlePaging = (next) => {
        const newOffset = next ? offsetScroll + 10 : Math.max(offsetScroll - 10, 0);
        setOffsetScroll(newOffset);
    };

    async function deleteBuku(id) {

        const MySwal = withReactContent(Swal)

        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/books/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
                    load();
                    MySwal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } catch (error) {

                }
            }
        })
        console.log(id);
    }
    async function download(type) {
        try {
            let urlTarget = axios.defaults.baseURL + `export/${type}?token=` + localStorage.getItem('key')
            window.open(urlTarget, '_blank');
        } catch (error) {

        }
    }

    useEffect(() => {
        if (search) {   
            performSearch(search, offsetScroll);
        } else {
            load(offsetScroll);
        }
    }, [offsetScroll]);
    useEffect(() => {
        load()
    }, [])
    useEffect(() => {
        performSearch(search)
        // console.log(search);
    }, [search])

    return (
        <>
            <div className="container-fluid pt-4 px-4">

                <div className="col-12">
                    <div className="bg-light rounded h-100 p-4">
                        <div className="d-flex justify-content-between">
                            <h6 className="mb-4">List Buku</h6>
                            <div className="d-flex gap-3">
                                <div className="dropdown">
                                    <button className="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Export
                                    </button>
                                    <ul className="dropdown-menu">

                                        <li><a onClick={() => download("pdf")} className="dropdown-item" href="#">PDF</a></li>
                                        <li><a className="dropdown-item" onClick={() => download("excel")}>Excel</a></li>
                                    </ul>
                                </div>
                                <NavLink to={'/books/add'}>
                                    <button className="btn btn-sm  btn-primary text-light" >
                                        Tambah Buku
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="table-responsive"   >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Uploader</th>
                                        <th scope="col">Categori</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {books.map((e, index) =>
                                        <tr key={e.id}>
                                            <td>{index + 1}</td>
                                            <td>{e.name}</td>
                                            <td>{e.category}</td>
                                            <td>{e.title}</td>
                                            <td>{e.quantity}</td>
                                            <td className="d-flex gap-3">
                                                <NavLink to={'/books/edit/'+e.title}>
                                                    <button type="button" className="btn  btn-primary ">Lihat</button>
                                                </NavLink>
                                                <button type="button" onClick={() => deleteBuku(e.id)} className="btn  btn-danger ">Hapus</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                                <div className="d-flex justify-content-center">
                                    <Pagination length={books.length} handlePaging={handlePaging} offsetScroll={offsetScroll} />
                                </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}