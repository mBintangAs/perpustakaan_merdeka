import axios from "axios"
import { useRef } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Pagination from "../partials/Pagination"


export default function Categories() {
    const search = useOutletContext()
    const [categories, setCategories] = useState([])
    const [offsetScroll, setOffsetScroll] = useState(0);
    const [name, setName] = useState('');
    const [idCategory, setIdCategory] = useState('');

    async function load(offset = 0) {
        try {
            const res_categories = await axios.get(`/categories?offset=${offset}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
            setCategories(res_categories.data);
        } catch (error) {

        }
    }
    const performSearch = async (search, offset = 0) => {
        try {
            const res_search = await axios.post('/search/category', { q: search, offset }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
            setCategories(res_search.data);
        } catch (error) {
            // console.error('Error during search:', error);
        }
    };
    const handlePaging = (next) => {
        const newOffset = next ? offsetScroll + 10 : Math.max(offsetScroll - 10, 0);
        setOffsetScroll(newOffset);
    };
    async function deleteCategories(id) {
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
                    const res_delte_categories = await axios.delete('/categories/' + id, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })

                    MySwal.fire({
                        title: "Successfully Deleted Categories",
                        icon: "success",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok"
                    })
                    load()
                    setName("")
                } catch (error) {
                    console.log(error);
                    MySwal.fire({
                        title: "Something When Wrong",
                        text:error.message,
                        icon: "error",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok"
                    })
                }
            }
        });

    }
    async function addCategories(e) {
        e.preventDefault();
        try {
            const res_add_categories = await axios.post('/categories', { name }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
            const MySwal = withReactContent(Swal)

            MySwal.fire({
                title: "Successfully Add Categories",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok"
            })
            load()
            setName("")
        } catch (error) {

        }

    }
    async function updateCategories(e) {
        e.preventDefault();
        try {
            const res_add_categories = await axios.put('/categories/'+idCategory, { name }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('key') } })
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: "Successfully Update Categories",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok"
            })
            load()
            setName("")
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
                            <h6 className="mb-4">List Kategori</h6>
                            <button className="btn btn-sm  btn-primary text-light" data-bs-toggle="modal" data-bs-target="#addCategories" >
                                Tambah Kategori
                            </button>
                        </div>
                        <div>

                            {/* Modal */}
                            <div className="modal fade" id="updateCategories" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <form onSubmit={updateCategories}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Ubah Kategori</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-floating my-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        onChange={e => setName(e.target.value)}
                                                        value={name}
                                                        required
                                                        placeholder=""
                                                    />
                                                    <label htmlFor="floatingInput">Judul Buku</label>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            {/* Modal */}
                            <div className="modal fade" id="addCategories" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <form onSubmit={addCategories}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Tambah Kategori</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <div className="form-floating my-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        onChange={e => setName(e.target.value)}
                                                        value={name}
                                                        required
                                                        placeholder=""
                                                    />
                                                    <label htmlFor="floatingInput">Judul Buku</label>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Save changes</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>

                        <div className="table-responsive"   >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((e, idx) =>
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{e.name}</td>
                                            <td className="d-flex gap-3">
                                                <button type="button" onClick={()=>{setName(e.name);setIdCategory(e.id)}}  className="btn  btn-info  text-light"  data-bs-toggle="modal" data-bs-target="#updateCategories">Ubah</button>
                                                <button type="button" onClick={() => {deleteCategories(e.id) }} className="btn  btn-danger ">Hapus</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="d-flex justify-content-center">
                                <Pagination length={categories.length} handlePaging={handlePaging} offsetScroll={offsetScroll} />
                            </div>

                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}