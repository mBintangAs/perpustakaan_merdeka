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
                            <button className="btn btn-sm  btn-primary text-light" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                                Tambah Kategori
                            </button>
                        </div>
                        <div>

                            {/* Modal */}
                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <div className="modal-body">
                                            ...
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
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
                                            <td>{idx+1}</td>
                                            <td>{e.name}</td>
                                            <td className="d-flex gap-3">
                                                <button type="button" className="btn  btn-primary ">Lihat</button>
                                                <button type="button" className="btn  btn-info  text-light">Ubah</button>
                                                <button type="button" onClick={() => { }} className="btn  btn-danger ">Hapus</button>
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