import { cilPlus, cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CRow, CCol, CCard, CCardBody, CSpinner, CTooltip, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CFormLabel, CFormInput, CBadge, CFormSelect } from "@coreui/react"
import { useEffect, useState } from "react";
import { dateUtil, toastUtil } from "../../utils";
import Pagination from 'react-js-pagination'
import { IQuestionnaire } from "../../services/questionnaire";
import { questionnaireService } from "../../services";
import { strToBool } from "../../utils/common.util";

const Index = () => {

    const [data, setData] = useState<IQuestionnaire[]>([]);
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
                const response = await questionnaireService.get({ page, limit });
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
        const { name, description, max_respondent, start_date, end_date, is_limit } = val
        try {
            if (!val.id) {
                await questionnaireService.create({ name, description, max_respondent, start_date, end_date, is_limit: strToBool(is_limit) })
                toastUtil.useAlert('Tambah Data berhasil', 'success')
                setModal(false)
                setUpdate(true)
            } else {
                await questionnaireService.update({ id: val.id, name, description, max_respondent, start_date, end_date, is_limit: strToBool(is_limit) })
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
                        <h5>Periode Kuesioner <button className="btn btn-sm btn-danger text-white float-end" onClick={() => toggle()}><CIcon icon={cilPlus} /> Tambah Periode Kuesioner</button></h5>
                    </div>
                    <CCard className="mb-2">
                        {isLoading && <div className="text-center"><CSpinner color="info" /></div>}
                        <CCardBody>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="bg-light">
                                            <th>No</th>
                                            <th>Nama Periode</th>
                                            <th>Keterangan</th>
                                            <th>Tanggal Mulai</th>
                                            <th>Tanggal Akhir</th>
                                            <th>Tanggal Buat</th>
                                            <th>Tanggal Ubah</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((el, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{no++}</td>
                                                    <td>{el.name}</td>
                                                    <td>{el.description}</td>
                                                    <td>{dateUtil.formatDate(el.start_date)}</td>
                                                    <td>{dateUtil.formatDate(el.end_date)}</td>
                                                    <td>{dateUtil.formatDateFull(el.created_at)}</td>
                                                    <td>{dateUtil.formatDateFull(el.updated_at)}</td>
                                                    <td>{dateUtil.formatDateBetween(el.start_date, el.end_date) ? (<CBadge color="success">Aktif</CBadge>) : (<CBadge color="danger">Tidak Aktif</CBadge>)}</td>
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
                        <CFormLabel htmlFor="name">Nama Periode <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="text" id="name" placeholder="Cth: Catur Wulan 1" onChange={(e) => setObj({ ...obj, name: e.target.value })} value={obj?.name || ''} />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="description">Keterangan <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="text" id="description" placeholder="Masukan Keterangan" onChange={(e) => setObj({ ...obj, description: e.target.value })} value={obj?.description || ''} />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="start_date">Tanggal Mulai <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="date" id="start_date" placeholder="Tanggal Mulai" onChange={(e) => setObj({ ...obj, start_date: e.target.value })} value={obj?.start_date || ''} />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="start_date">Tanggal Akhir <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="date" id="end_date" placeholder="Tanggal Akhir" onChange={(e) => setObj({ ...obj, end_date: e.target.value })} value={obj?.end_date || ''} />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="">Pembatasan Jumlah Responden <span className="text-danger">*</span></CFormLabel>
                        <CFormSelect onChange={e => setObj({ ...obj, is_limit: e.target.value })} value={Number(obj?.is_limit) || '0'}>
                            <option value="0">Tidak dibatasi</option>
                            <option value="1">Batasi</option>
                        </CFormSelect>
                    </div>
                    {(() => {
                        if (obj?.is_limit === '1' || (obj?.id && obj?.is_limit)) {
                            return (
                                <div className="mb-3">
                                    <CFormLabel htmlFor="start_date">Jumlah Responden <span className="text-danger">*</span></CFormLabel>
                                    <CFormInput type="number" id="max_respondent" placeholder="Masukan Jumlah Responden" onChange={(e) => setObj({ ...obj, max_respondent: e.target.value })} value={obj?.max_respondent || ''} />
                                </div>
                            )
                        } else {
                            return('')
                        }
                    })()}
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
