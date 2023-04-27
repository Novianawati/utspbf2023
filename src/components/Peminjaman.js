import axios from "axios";
import React, {useEffect, useState} from "react";
import "./Peminjaman.css"

const Peminjaman = () => {
    const [data, setData] = useState([{}]);
    useEffect(()=>{
        getPinjam();
        console.log(data);
    }, []);
    const getPinjam = async() => {
        await axios
        .get("http://localhost:4000/pinjam")
        .then((res) => setData(res.data));
    };
    const [formData, setFormData] = useState({
        nomoranggota:"",
        namaLgp:"",
        notel:"",
        bukuPinjam:"",
        tglPinjam:"",
    });
    const [editData, setEditData] = useState({
        nomoranggota:"",
        namaLgp:"",
        notel:"",
        bukuPinjam:"",
        tglPinjam:"",
        id:"",
    });
    const handleFormSubmit = async (e) => {
        let response = await axios.post("http://localhost:4000/pinjam", formData);

        if(response){
            alert("data sukses dimasukkan");
        }else{
            alert("data gagal dimasukkan");
        }
        setFormData({
            nomoranggota:"",
            namaLgp:"",
            notel:"",
            bukuPinjam:"",
            tglPinjam:"",
        });
        getPinjam();
    };
    const handleDelete = async(id) => {
        await axios
        .delete('http://localhost:4000/pinjam/' + id)
        .then((res) => alert("data telah dihapus"));
    };
    const handleEdit = async () => {
        await axios.put(`http://localhost:4000/pinjam/${editData.id}`, editData)
        .then((res) => {
            alert("Edit data berhasil");
            getPinjam();
        });
    };
    return (
        <div className="container">
            <div className="row">
                <h1>Tambahkan Data Peminjaman Buku</h1>
                <div for="formkembali" class="mb-3 row">
                    <label class="col-sm-2 col-form-label">Nomor Keanggotaan</label>
                    <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formkembali"
                        value={formData.nomoranggota}
                        onChange={(e) => setFormData({ ...formData, nomoranggota: e.target.value})}
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
                        value={formData.namaLgp}
                        onChange={(e) => setFormData({ ...formData, namaLgp: e.target.value})}
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
                        value={formData.notel}
                        onChange={(e) => setFormData({ ...formData, notel: e.target.value})}
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
                        value={formData.bukuPinjam}
                        onChange={(e) => setFormData({ ...formData, bukuPinjam: e.target.value})}
                        />
                    </div>
                </div>
                <div for="formkembali" class="mb-3 row">
                    <label class="col-sm-2 col-form-label">Tanggal Peminjaman</label>
                    <div class="col-sm-10">
                    <input
                        type="text"
                        class="form-control"
                        id="formkembali"
                        value={formData.tglPinjam}
                        onChange={(e) => setFormData({ ...formData, tglPinjam: e.target.value})}
                        />
                    </div>
                </div>
                <div class="mb-3">
                    <button className="btn btn-success"
                    onClick={handleFormSubmit}>Submit</button>
                </div>
            </div>{" "}
            <div>
            <h1>List Peminjaman Buku</h1>
            <table class="table table-dark table-bordered">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">No.Keanggotaan</th>
                <th scope="col">Nama Lengkap</th>
                <th scope="col">Nomor HP</th>
                <th scope="col">Buku</th>
                <th scope="col">Tanggal Peminjaman</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.map(pjm => (
                        <tr>
                        <th scope="row">{pjm.id}</th>
                        <td>{pjm.nomoranggota}</td>
                        <td>{pjm.namaLgp}</td>
                        <td>{pjm.notel}</td>
                        <td>{pjm.bukuPinjam}</td>
                        <td>{pjm.tglPinjam}</td>
                        <td 
                        style={{display:"flex",
                        justifyContent:
                        "space-evenly" }}>
                            <button className=
                            "btn btn-info"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={()=>setEditData({
                                nomoranggota:pjm.nomoranggota,
                                namaLgp:pjm.namaLgp,
                                notel:pjm.notel,
                                bukuPinjam:pjm.bukuPinjam,
                                tglPinjam:pjm.tglPinjam,
                                id:pjm.id,
                            })}
                            >Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(pjm.id)}>Hapus</button>
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
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Peminjaman</h1>
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
                        value={editData.nomoranggota}
                        onChange={(e) => 
                            setEditData({ ...editData, nomoranggota: e.target.value})
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
                        value={editData.namaLgp}
                        onChange={(e) => 
                            setEditData({ ...editData, namaLgp: e.target.value})
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
                        value={editData.notel}
                        onChange={(e) => 
                            setEditData({ ...editData, notel: e.target.value})
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
                        value={editData.bukuPinjam}
                        onChange={(e) => 
                            setEditData({ ...editData, bukuPinjam: e.target.value})
                        }
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Tanggal Peminjaman
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        value={editData.tglPinjam}
                        onChange={(e) => 
                            setEditData({ ...editData, tglPinjam: e.target.value})
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

export default Peminjaman;