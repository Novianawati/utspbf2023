import axios from "axios";
import React, {useEffect, useState} from "react";
import "./Keanggotaan.css"

const Keanggotaan = () => {
    const [data, setData] = useState([{}]);
    useEffect(()=>{
        getAnggota();
        console.log(data);
    }, []);
    const getAnggota = async() => {
        await axios
        .get("http://localhost:4000/anggota")
        .then((res) => setData(res.data));
    };
    const [formData, setFormData] = useState({
        nik:"",
        namaLengkap:"",
        nomorhp:"",
        alamat:"",
    });
    const [editData, setEditData] = useState({
        nik:"",
        namaLengkap:"",
        nomorhp:"",
        alamat:"",
        id:"",
    });
    const handleFormSubmit = async (e) => {
        let response = await axios.post("http://localhost:4000/anggota", formData);

        if(response){
            alert("data sukses dimasukkan");
        }else{
            alert("data gagal dimasukkan");
        }
        setFormData({
            nik:"",
            namaLengkap:"",
            nomorhp:"",
            alamat:"",
        });
        getAnggota();
    };
    const handleDelete = async(id) => {
        await axios
        .delete('http://localhost:4000/anggota/' + id)
        .then((res) => alert("data telah dihapus"));
    };
    const handleEdit = async () => {
        await axios.put(`http://localhost:4000/anggota/${editData.id}`, editData)
        .then((res) => {
            alert("Edit data berhasil");
            getAnggota();
        });
    };
    return (
        <div className="container">
            <div className="row">
                <h1 >Tambahkan Data Keanggotaan</h1>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">NIK
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={formData.nik}
                        onChange={(e) => 
                            setFormData({ ...formData, nik: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Nama Lengkap
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={formData.namaLengkap}
                        onChange={(e) => 
                            setFormData({ ...formData, namaLengkap: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Nomor HP
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={formData.nomorhp}
                        onChange={(e) => 
                            setFormData({ ...formData, nomorhp: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Alamat
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={formData.alamat}
                        onChange={(e) => 
                            setFormData({ ...formData, alamat: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <button className="btn btn-success"
                    onClick={handleFormSubmit}>Daftar</button>
                </div>
            </div>{" "}
            <div>
            <h1>List Keanggotaan Perpustakaan</h1>
            <table class="table table-dark table-hover">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">NIK</th>
                <th scope="col">Nama Lengkap</th>
                <th scope="col">Nomor HP</th>
                <th scope="col">Alamat</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map(keanggotaan => (
                        <tr>
                        <th scope="row">{keanggotaan.id}</th>
                        <td>{keanggotaan.nik}</td>
                        <td>{keanggotaan.namaLengkap}</td>
                        <td>{keanggotaan.nomorhp}</td>
                        <td>{keanggotaan.alamat}</td>
                        <td 
                        style={{display:"flex",
                        justifyContent:
                        "space-evenly" }}>
                            <button className=
                            "btn btn-info"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={()=>setEditData({
                                nik:keanggotaan.nik,
                                namaLengkap:keanggotaan.namaLengkap,
                                nomorhp:keanggotaan.nomorhp,
                                alamat:keanggotaan.alamat,
                                id:keanggotaan.id,
                            })}
                            >Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(keanggotaan.id)}>Hapus</button>
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
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Keanggotaan</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">NIK
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.nik}
                        onChange={(e) => 
                            setEditData({ ...editData, nik: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Nama Lengkap
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.namaLengkap}
                        onChange={(e) => 
                            setEditData({ ...editData, namaLengkap: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Nomor HP
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.nomorhp}
                        onChange={(e) => 
                            setEditData({ ...editData, nomorhp: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Alamat
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.alamat}
                        onChange={(e) => 
                            setEditData({ ...editData, alamat: e.target.value})
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

export default Keanggotaan;