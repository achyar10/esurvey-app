import { cilPlus, cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CRow, CCol, CCard, CCardBody, CSpinner, CTooltip, CButton, CModal, CModalBody, CModalFooter, CModalHeader, CFormLabel, CFormSelect, CFormTextarea, CBadge, CFormInput } from "@coreui/react"
import { useEffect, useState } from "react";
import { toastUtil } from "../../utils";
import Pagination from 'react-js-pagination'
import { IQuestion } from "../../services/question";
import { questionService, questionCategoryService } from "../../services";
import { strToBool } from "../../utils/common.util";
import { IQuestionCategory } from "../../services/question-category";

const Index = () => {

    const [data, setData] = useState<IQuestion[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPage, setTotalPage] = useState(0);
    const [totalDocs, setTotalDocs] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false)
    const [modal, setModal] = useState(false);
    const [obj, setObj] = useState<any>(null);
    const [categories, setCategory] = useState<IQuestionCategory[]>([]);
    const [answers, setAnswers] = useState<any>([]);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await Promise.all([
                    questionService.get({ page, limit }),
                    questionCategoryService.get({}),
                ])
                setData(response[0].data)
                setPage(response[0].meta.page);
                setLimit(response[0].meta.limit);
                setTotalDocs(response[0].meta.totalDocs);
                setTotalPage(response[0].meta.totalPages);
                setCategory(response[1].data);
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
                setAnswers(obj.answers)
            } else {
                setObj(null)
                setAnswers([])
            }
        } else {
            setModal(false)
        }
    }

    const save = async (val: any) => {
        if (!val) return toastUtil.useAlert('Form tidak boleh ada yang kosong!')
        const { description, question_category_id, is_active, answers } = val
        try {
            if (!val.id) {
                await questionService.create({ description, question_category_id, is_active: strToBool(is_active), answers })
                toastUtil.useAlert('Tambah Data berhasil', 'success')
                setModal(false)
                setUpdate(true)
            } else {
                answers.map((el: any) => {
                    return { ...el, question: el.question_id}
                })
                await questionService.update({ id: val.id, question_category: question_category_id, is_active: strToBool(is_active), description, answers})
                toastUtil.useAlert('Ubah Data berhasil', 'success')
                setModal(false)
                setUpdate(true)
            }
        } catch (error: any) {
            toastUtil.useAlert(error.message)
        }
    }

    const updateAnswers = (index: number, code: string, name: string) => {
        let newAnswers = [...answers]
        newAnswers[index] = { ...newAnswers[index], index_code: code, index_name: name}
        setAnswers(newAnswers)
        setObj({ ...obj, answers: newAnswers })
    }

    let no = (page - 1) * limit + 1;
    const indexs: string[] = ['a', 'b', 'c', 'd']
    return (
        <>
            <CRow>
                <CCol md={12}>
                    <div className="mb-3">
                        <h5>Daftar Pertanyaan <button className="btn btn-sm btn-danger text-white float-end" onClick={() => toggle()}><CIcon icon={cilPlus} /> Tambah Pertanyaan</button></h5>
                    </div>
                    <CCard className="mb-2">
                        {isLoading && <div className="text-center"><CSpinner color="info" /></div>}
                        <CCardBody>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr className="bg-light">
                                            <th>No</th>
                                            <th>Unsur Pelayanan</th>
                                            <th>Pertanyaan</th>
                                            <th>Keterangan</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((el, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{no++}</td>
                                                    <td>{el.question_category.name}</td>
                                                    <td>{el.description.slice(0, 50)}...</td>
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

            <CModal size="lg" visible={modal} onClose={() => setModal(false)}>
                <CModalHeader closeButton><h5>Form</h5></CModalHeader>
                <CModalBody>
                    <div className="mb-3">
                        <CFormLabel>Unsur Pelayanan <span className="text-danger">*</span></CFormLabel>
                        <CFormSelect onChange={(e) => setObj({ ...obj, question_category_id: e.target.value })} value={obj?.question_category?.id}>
                            <option value="">---Pilih Unsur Pelayanan---</option>
                            {categories.map((el, i) => {
                                return (
                                    <option key={i} value={el.id}>{el.name}</option>
                                )
                            })}
                        </CFormSelect>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="name">Pertanyaan <span className="text-danger">*</span></CFormLabel>
                        <CFormTextarea placeholder="Masukan Pertanyaan" onChange={(e) => setObj({ ...obj, description: e.target.value })} value={obj?.description || ''}></CFormTextarea>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="name">Jawaban <span className="text-danger">*</span></CFormLabel>
                        {indexs.map((el, i) => {
                            return (
                                <CRow key={i} className="mb-2">
                                    <CCol md={1}>
                                        <CFormInput type="text" value={obj?.answers?.[i]?.index_code || el} readOnly />
                                    </CCol>
                                    <CCol>
                                        <CFormInput type="text" placeholder="Masukan jawaban" onChange={(e) => updateAnswers(i, el, e.target.value)} value={obj?.answers?.[i]?.index_name || ''} />
                                    </CCol>
                                </CRow>
                            )
                        })}
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
