import { cilPlus, cilPencil, cilFilter } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CRow, CCol, CCard, CCardBody, CSpinner, CTooltip, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CFormLabel, CFormInput, CBadge, CFormSelect, CCollapse, CForm } from "@coreui/react"
import { useEffect, useState } from "react";
import { toastUtil } from "../../utils";
import Pagination from 'react-js-pagination'
import { IRespondent } from "../../services/respondent";
import { eduService, jobStatusService, jobTitleService, respondentService } from "../../services";
import { strToBool } from "../../utils/common.util";
import { IEducation } from "../../services/education";
import { IJobTitle } from "../../services/job-title";
import { IJobStatus } from "../../services/job-status";
import { debounce } from 'lodash';

const Index = () => {

    const [data, setData] = useState<IRespondent[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [totalDocs, setTotalDocs] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false)
    const [modal, setModal] = useState(false);
    const [visible, setVisible] = useState(false)
    const [obj, setObj] = useState<any>(null);
    const [education, setEducation] = useState<IEducation[]>([]);
    const [jobTitles, setJobTitles] = useState<IJobTitle[]>([]);
    const [jobStatus, setJobStatus] = useState<IJobStatus[]>([]);
    const [query_by, setQueryBy] = useState('');
    const [query_value, setQueryValue] = useState('');

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await Promise.all([
                    respondentService.get({ page, limit, query_by, query_value }),
                    eduService.get({}),
                    jobStatusService.get({}),
                    jobTitleService.get({}),
                ])
                setData(response[0].data)
                setPage(response[0].meta.page);
                setLimit(response[0].meta.limit);
                setTotalDocs(response[0].meta.totalDocs);
                setTotalPage(response[0].meta.totalPages);

                setEducation(response[1].data);
                setJobTitles(response[2].data);
                setJobStatus(response[3].data);
                setUpdate(false)
            } catch (error: any) {
                toastUtil.useAlert(error.message)
            }
            setLoading(false);
        };
        fetch();
    }, [page, limit, update, query_by, query_value]);


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
        const { nik, fullname, gender, birthyear, education_id, job_status_id, job_title_id, is_active } = val
        try {
            if (!val.id) {
                await respondentService.create({ nik, fullname, gender, birthyear, education_id, job_status_id, job_title_id, is_active: strToBool(is_active) })
                toastUtil.useAlert('Tambah Data berhasil', 'success')
                setModal(false)
                setUpdate(true)
            } else {
                await respondentService.update({ id: val.id, nik, fullname, gender, birthyear, education: education_id, job_status: job_status_id, job_title: job_title_id, is_active: strToBool(is_active) })
                toastUtil.useAlert('Ubah Data berhasil', 'success')
                setModal(false)
                setUpdate(true)
            }
        } catch (error: any) {
            toastUtil.useAlert(error.message)
        }
    }

    const handleFilterBy = debounce((val) => {
        if (val === '') {
            setQueryBy('')
            setQueryValue('')
        } else {
            setQueryBy(val)
        }
    }, 1000)

    const handleFilterVal = debounce((val) => {
        if (val === '') {
            setQueryValue('')
        } else {
            setQueryValue(val)
        }
    }, 1000)

    let no = (page - 1) * limit + 1;
    return (
        <>
            <CRow>
                <CCol md={12}>
                    <div className="mb-3">
                        <h5>
                            Daftar Responden 
                            <CButton color="dark" size="sm" className="btn d-block float-end text-white ms-1" onClick={() => setVisible(!visible)}><CIcon icon={cilFilter} /> Filter</CButton>

                            <button className="btn btn-sm btn-danger text-white float-end" onClick={() => toggle()}><CIcon icon={cilPlus} /> Tambah Responden</button>
                            </h5>
                    </div>
                    <CCard className="mb-2">
                        <CCollapse visible={visible}>
                            <div className="mt-2 p-3">
                                <CForm className="row g-3">
                                    <CCol>
                                        <CFormSelect onChange={(e) => handleFilterBy(e.target.value)}>
                                            <option value="">---Filter Berdasarkan---</option>
                                            <option value="fullname">Nama Responden</option>
                                            <option value="nik">NIP / NIK</option>
                                        </CFormSelect>
                                    </CCol>
                                    <CCol>
                                        <CFormInput type="text" placeholder="Ketik isian disni..." onChange={(e) => handleFilterVal(e.target.value)} />
                                    </CCol>
                                </CForm>
                            </div>
                            <hr />
                        </CCollapse>
                        {isLoading && <div className="text-center"><CSpinner color="info" /></div>}
                        <CCardBody>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="bg-light">
                                            <th>No</th>
                                            <th>NIK/NIP</th>
                                            <th>Nama Respondent</th>
                                            <th>Jenis Kelamin</th>
                                            <th>Umur</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((el, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{no++}</td>
                                                    <td>{el.nik}</td>
                                                    <td>{el.fullname}</td>
                                                    <td>{el.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</td>
                                                    <td>{new Date().getFullYear() - el.birthyear} th</td>
                                                    <td>{el.is_active ? (<CBadge color="success">Aktif</CBadge>) : (<CBadge color="danger">Tidak Aktif</CBadge>)}</td>
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
                        <CFormLabel htmlFor="nik">NIK/NIP <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="text" id="nik" placeholder="Cth: 12345" onChange={(e) => setObj({ ...obj, nik: e.target.value })} value={obj?.nik || ''} />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="fullname">Nama Responden <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="text" id="fullname" placeholder="Cth: Jhon Doe" onChange={(e) => setObj({ ...obj, fullname: e.target.value })} value={obj?.fullname || ''} />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="">Jenis Kelamin <span className="text-danger">*</span></CFormLabel>
                        <CFormSelect onChange={e => setObj({ ...obj, gender: e.target.value })} value={obj?.gender || 'male'}>
                            <option value="male">Laki-laki</option>
                            <option value="female">Perempuan</option>
                        </CFormSelect>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="birthyear">Tahun Lahir <span className="text-danger">*</span></CFormLabel>
                        <CFormInput type="number" id="birthyear" placeholder="Cth: 1994" onChange={(e) => setObj({ ...obj, birthyear: e.target.value })} value={obj?.birthyear || ''} />
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Jenjang Pendidikan <span className="text-danger">*</span></CFormLabel>
                        <CFormSelect onChange={(e) => setObj({...obj, education_id: e.target.value})} value={obj?.education?.id}>
                            <option value="">---Pilih Pendidikan---</option>
                            {education.map((el, i) => {
                                return (
                                    <option key={i} value={el.id}>{el.name}</option>
                                )
                            })}
                        </CFormSelect>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Status Pekerjaan <span className="text-danger">*</span></CFormLabel>
                        <CFormSelect onChange={(e) => setObj({...obj, job_status_id:e.target.value})} value={obj?.job_status?.id}>
                            <option value="">---Pilih Status Pekerjaan---</option>
                            {jobStatus.map((el, i) => {
                                return (
                                    <option key={i} value={el.id}>{el.name}</option>
                                )
                            })}
                        </CFormSelect>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Jabatan Pekerjaan <span className="text-danger">*</span></CFormLabel>
                        <CFormSelect onChange={(e) => setObj({...obj, job_title_id: e.target.value})} value={obj?.job_title?.id}>
                            <option value="">---Pilih Jabatan Pekerjaan---</option>
                            {jobTitles.map((el, i) => {
                                return (
                                    <option key={i} value={el.id}>{el.name}</option>
                                )
                            })}
                        </CFormSelect>
                    </div>
                    <div className="form-group mb-2">
                        <CFormLabel htmlFor="">Status <span className="text-danger">*</span></CFormLabel>
                        <CFormSelect onChange={e => setObj({ ...obj, is_active: e.target.value })} value={Number(obj?.is_active) || '0'}>
                            <option value="1">Aktif</option>
                            <option value="0">Tidak Aktif</option>
                        </CFormSelect>
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
