import { cilPlus, cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CRow, CCol, CCard, CCardBody, CSpinner, CTooltip, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CFormLabel, CFormInput } from "@coreui/react"
import { useEffect, useState } from "react";
import { dateUtil, toastUtil } from "../../utils";
import Pagination from 'react-js-pagination'
import { IEducation } from "../../services/education";
import { eduService } from "../../services";

const Index = () => {

    const [data, setData] = useState<IEducation[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [totalDocs, setTotalDocs] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false)
    const [modal, setModal] = useState(false);
    const [obj, setObj] = useState<any>(null);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await eduService.get({ page, limit });
                setData(response.data)
                setPage(response.meta.page);
                setLimit(response.meta.limit);
                setTotalDocs(response.meta.totalDocs);
                setTotalPage(response.meta.totalPages);
                setUpdate(false)
            } catch (error: any) {
                toastUtil.useAlert(error.message)
            }
            setLoading(false);
        };
        fetch();
    }, [page, limit, update]);


    const toggle = (obj?: any) => {
        if (!modal) {
            setModal(true)
            if (obj) {
                setObj(obj)
            } else {
                setObj(null)
            }
        } else {
            setModal(false)
        }
    }

    const save = async (val: any) => {
        if (!val) return toastUtil.useAlert('Form tidak boleh ada yang kosong!')
        const { name } = val
        try {
            if (!val.id) {
                await eduService.create({ name })
                toastUtil.useAlert('Tambah Data berhasil', 'success')
                setModal(false)
                setUpdate(true)
            } else {
                await eduService.update({ id: val.id, name })
                toastUtil.useAlert('Ubah Data berhasil', 'success')
                setModal(false)
                setUpdate(true)
            }
        } catch (error: any) {
            toastUtil.useAlert(error.message)
        }
    }

    let no = (page - 1) * limit + 1;
    return (
        <>
            <CRow>
                <CCol md={12}>
                    <div className="mb-3">
                        <h5>Jenis Pendidikan <button className="btn btn-sm btn-danger text-white float-end" onClick={() => toggle()}><CIcon icon={cilPlus} /> Tambah Pendidikan</button></h5>
                    </div>
                    <CCard className="mb-2">
                        {isLoading && <div className="text-center"><CSpinner color="info" /></div>}
                        <CCardBody>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="bg-light">
                                            <th>No</th>
                                            <th>Jenis Pendidikan</th>
                                            <th>Tanggal Ubah</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((el, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{no++}</td>
                                                    <td>{el.name}</td>
                                                    <td>{dateUtil.formatDateFull(el.updated_at)}</td>
                                                    <td>
                                                        <CTooltip placement="top" content="Ubah">
                                                            <button className="d-inline btn btn-sm btn-info text-white text-nowrap ms-1" onClick={() => toggle(el)}><CIcon icon={cilPencil} /></button>
                                                        </CTooltip>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <span className="fw-light">Menampilkan {data.length} dari {totalDocs} data</span>
                            <div className="float-end">
                                <Pagination
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={page}
                                    itemsCountPerPage={limit}
                                    totalItemsCount={totalDocs}
                                    pageRangeDisplayed={totalPage}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal visible={modal} onClose={() => setModal(false)}>
                <CModalHeader closeButton><h5>Form</h5></CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <CFormLabel htmlFor="name">Jenis Pendidikan <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="text" id="name" placeholder="Cth: SD" onChange={(e) => setObj({ ...obj, name: e.target.value })} value={obj?.name || ''} />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" className="text-white" onClick={() => setModal(false)}>Batal</CButton>
                    <CButton color="success" className="text-white" onClick={() => save(obj)}>Simpan</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}
export default Index
