import axios from "axios";
import React, {useEffect, useState} from "react";
import "./Koleksi.css"

const AddKoleksi = () => {
    const [data, setData] = useState([{}]);
    useEffect(()=>{
        getKoleksi();
        console.log(data);
    }, []);
    const getKoleksi = async() => {
        await axios
        .get("http://localhost:4000/koleksidb")
        .then((res) => setData(res.data));
    };
    const [formData, setFormData] = useState({
        judul:"",
        tahun:"",
        penulis:"",
    });
    const [editData, setEditData] = useState({
        judul:"",
        tahun:"",
        penulis:"",
        id:"",
    });
    const handleFormSubmit = async (e) => {
        let response = await axios.post("http://localhost:4000/koleksidb", formData);

        if(response){
            alert("data sukses dimasukkan");
        }else{
            alert("data gagal dimasukkan");
        }
        setFormData({
            judul:"",
            tahun:"",
            penulis:"",
        });
        getKoleksi();
    };
    const handleDelete = async(id) => {
        await axios
        .delete('http://localhost:4000/koleksidb/' + id)
        .then((res) => alert("data telah dihapus"));
    };
    const handleEdit = async () => {
        await axios.put(`http://localhost:4000/koleksidb/${editData.id}`, editData)
        .then((res) => {
            alert("Edit data berhasil");
            getKoleksi();
        });
    };
    return (
        <div className="container">
            <div className="row">
                <h1 >Tambahkan Data Koleksi</h1>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Judul
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={formData.judul}
                        onChange={(e) => 
                            setFormData({ ...formData, judul: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Tahun terbit
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={formData.tahun}
                        onChange={(e) => 
                            setFormData({ ...formData, tahun: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Penulis
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={formData.penulis}
                        onChange={(e) => 
                            setFormData({ ...formData, penulis: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <button className="btn btn-success"
                    onClick={handleFormSubmit}>Add koleksi</button>
                </div>
            </div>{" "}
            <div>
            <h1>List Koleksi</h1>
            <table class="table table-dark table-hover">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Judul</th>
                <th scope="col">Tahun Terbit</th>
                <th scope="col">Penulis</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map(koleksi => (
                        <tr>
                        <th scope="row">{koleksi.id}</th>
                        <td>{koleksi.judul}</td>
                        <td>{koleksi.tahun}</td>
                        <td>{koleksi.penulis}</td>
                        <td 
                        style={{display:"flex",
                        justifyContent:
                        "space-evenly" }}>
                            <button className=
                            "btn btn-info"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={()=>setEditData({
                                judul:koleksi.judul,
                                tahun:koleksi.tahun,
                                penulis:koleksi.penulis,
                                id:koleksi.id,
                            })}
                            >Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(koleksi.id)}>Hapus</button>
                        </td>
                        </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Koleksi</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Judul
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.judul}
                        onChange={(e) => 
                            setEditData({ ...editData, judul: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Tahun terbit
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.tahun}
                        onChange={(e) => 
                            setEditData({ ...editData, tahun: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Penulis
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.penulis}
                        onChange={(e) => 
                            setEditData({ ...editData, penulis: e.target.value})
                        }
                    />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-primary" onClick={()=>handleEdit()}>Edit</button>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default AddKoleksi;