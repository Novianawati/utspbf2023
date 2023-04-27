import axios from "axios";
import React, {useEffect, useState} from "react";
import "./Pengembalian.css"

const Pengembalian = () => {
    const [data, setData] = useState([{}]);
    useEffect(()=>{
        getKembalian();
        console.log(data);
    }, []);
    const getKembalian = async() => {
        await axios
        .get("http://localhost:4000/kembalian")
        .then((res) => setData(res.data));
    };
    const [formData, setFormData] = useState({
        noanggota:"",
        nama:"",
        notelp:"",
        buku:"",
        tglKembali:"",
    });
    const [editData, setEditData] = useState({
        noanggota:"",
        nama:"",
        notelp:"",
        buku:"",
        tglKembali:"",
        id:"",
    });
    const handleFormSubmit = async (e) => {
        let response = await axios.post("http://localhost:4000/kembalian", formData);

        if(response){
            alert("data sukses dimasukkan");
        }else{
            alert("data gagal dimasukkan");
        }
        setFormData({
            noanggota:"",
            nama:"",
            notelp:"",
            buku:"",
            tglKembali:"",
        });
        getKembalian();
    };
    const handleDelete = async(id) => {
        await axios
        .delete('http://localhost:4000/kembalian/' + id)
        .then((res) => alert("data telah dihapus"));
    };
    const handleEdit = async () => {
        await axios.put(`http://localhost:4000/kembalian/${editData.id}`, editData)
        .then((res) => {
            alert("Edit data berhasil");
            getKembalian();
        });
    };
    return (
        <div className="container">
            <div className="row">
                <h1>Tambahkan Data Pengembalian Buku</h1>
                <div for="formkembali" class="mb-3 row">
                    <label class="col-sm-2 col-form-label">Nomor Keanggotaan</label>
                    <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formkembali"
                        value={formData.noanggota}
                        onChange={(e) => setFormData({ ...formData, noanggota: e.target.value})}
                        />
                    </div>
                </div>
                <div for="formkembali" class="mb-3 row">
                    <label class="col-sm-2 col-form-label">Nama Lengkap</label>
                    <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formkembali"
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value})}
                        />
                    </div>
                </div>
                <div for="formkembali" class="mb-3 row">
                    <label class="col-sm-2 col-form-label">Nomor HP</label>
                    <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formkembali"
                        value={formData.notelp}
                        onChange={(e) => setFormData({ ...formData, notelp: e.target.value})}
                        />
                    </div>
                </div>
                <div for="formkembali" class="mb-3 row">
                    <label class="col-sm-2 col-form-label">Buku</label>
                    <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formkembali"
                        value={formData.buku}
                        onChange={(e) => setFormData({ ...formData, buku: e.target.value})}
                        />
                    </div>
                </div>
                <div for="formkembali" class="mb-3 row">
                    <label class="col-sm-2 col-form-label">Tanggal Pengembalian</label>
                    <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formkembali"
                        value={formData.tglKembali}
                        onChange={(e) => setFormData({ ...formData, tglKembali: e.target.value})}
                        />
                    </div>
                </div>
                <div class="mb-3">
                    <button className="btn btn-success"
                    onClick={handleFormSubmit}>Submit</button>
                </div>
            </div>{" "}
            <div>
            <h1>List Pengembalian Buku</h1>
            <table class="table table-dark table-bordered">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">No.Keanggotaan</th>
                <th scope="col">Nama Lengkap</th>
                <th scope="col">Nomor HP</th>
                <th scope="col">Buku</th>
                <th scope="col">Tanggal Pengembalian</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map(kembali => (
                        <tr>
                        <th scope="row">{kembali.id}</th>
                        <td>{kembali.noanggota}</td>
                        <td>{kembali.nama}</td>
                        <td>{kembali.notelp}</td>
                        <td>{kembali.buku}</td>
                        <td>{kembali.tglKembali}</td>
                        <td 
                        style={{display:"flex",
                        justifyContent:
                        "space-evenly" }}>
                            <button className=
                            "btn btn-info"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={()=>setEditData({
                                noanggota:kembali.noanggota,
                                nama:kembali.nama,
                                notelp:kembali.notelp,
                                buku:kembali.buku,
                                tglKembali:kembali.tglKembali,
                                id:kembali.id,
                            })}
                            >Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(kembali.id)}>Hapus</button>
                        </td>
                        </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Pengembalian</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Nomor Keanggotaan
                    </label>
                    <input 
                        type="text" 
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.noanggota}
                        onChange={(e) => 
                            setEditData({ ...editData, noanggota: e.target.value})
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
                        value={editData.nama}
                        onChange={(e) => 
                            setEditData({ ...editData, nama: e.target.value})
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
                        value={editData.notelp}
                        onChange={(e) => 
                            setEditData({ ...editData, notelp: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Buku
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.buku}
                        onChange={(e) => 
                            setEditData({ ...editData, buku: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Pengembalian
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.tglKembali}
                        onChange={(e) => 
                            setEditData({ ...editData, tglKembali: e.target.value})
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

export default Pengembalian;