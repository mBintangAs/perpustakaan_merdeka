import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Book() {
    const search = useOutletContext()
    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    async function load() {
        try {
            const res_book = await axios.get('/books', { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
            setBooks(res_book.data)
            const res_categories = await axios.get('/categories', { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
            let categories = [];
            res_categories.data.map((e) => categories.push({ value: e.id, label: e.name }))
            setCategories(categories)
        } catch (error) {

        }
    }
    useEffect(() => {
        load()
    }, [])
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
    return (
        <>
            <div className="container-fluid pt-4 px-4">

                <div className="col-12">
                    <div className="bg-light rounded h-100 p-4">
                        <div className="d-flex justify-content-between">
                            <h6 className="mb-4">List Buku</h6>
                            <NavLink to={'/books/add'}>
                                <button className="btn btn-sm  btn-primary text-light" >
                                    Tambah Buku
                                </button>

                            </NavLink>
                        </div>

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Uploader</th>
                                        <th scope="col">Categori</th>
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
                                            <td>{e.quantity}</td>
                                            <td className="d-flex gap-3">
                                                <button type="button" className="btn  btn-primary ">Ubah</button>
                                                <button type="button" onClick={() => deleteBuku(e.id)} className="btn  btn-danger ">Hapus</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}