import { CRow, CCol, CCard, CSpinner, CCardBody, CFormLabel, CFormSelect, CBadge, CButton } from "@coreui/react";
import { useState, useEffect } from "react";
import { resultService } from "../../services";
import { IRespondent, IResultQuestionnaire } from "../../services/result";
import { toastUtil } from "../../utils";
import ReactExport from 'react-data-export';
import { cilSpreadsheet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default function Index() {

    const [questionnaires, setQuestionnaire] = useState<IResultQuestionnaire[]>([]);
    const [data, setData] = useState<IRespondent[]>([]);
    const [id, setId] = useState<number>(0);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const response = await resultService.getQuestionnaire();
                setQuestionnaire(response.data)
                let setDefault = id;
                if (setDefault === 0) {
                    setId(response.data[0].id || 0);
                }
                const response2 = await resultService.getRespondent(id);
                setData(response2.data)
            } catch (error: any) {
                toastUtil.useAlert(error.message)
            }
            setLoading(false);
        };
        fetch();
    }, [id])

    const DataSet = [
        {
            columns: [
                { title: "NO" },
                { title: "NIP/NIK" },
                { title: "Nama Responden" },
                { title: "Status Kuesioner" },
                { title: "Tanggal Pengisian" },
                { title: "Saran" },

            ],
            data: data.map((el, i) => {
                return [
                    { value: i + 1 },
                    { value: el.nik || '' },
                    { value: el.fullname || '' },
                    { value: (el.is_questionnaire ? 'Selesai' : 'Belum Mengisi') || '' },
                    { value: el.date || '' },
                    { value: el.suggestion || '' },
                ]
            })
        }
    ]

    return (
        <>
            <CRow>
                <CCol md={12}>
                    <div className="mb-3">
                        <h5>Ringkasan Laporan</h5>
                    </div>
                    <CCard className="mb-2">
                        {isLoading && <div className="text-center"><CSpinner color="info" /></div>}
                        <CCardBody>
                            <div className="mb-3">
                                
                                <ExcelFile
                                    filename={`Questionnaire_Report_${new Date().getTime()}`}
                                    element={<CButton color="success" className="btn d-block text-white float-end" type="button"> <CIcon icon={cilSpreadsheet} /> Export Excel</CButton>}>
                                    <ExcelSheet dataSet={DataSet} name="Laporan Kuesioner Responden" />
                                </ExcelFile>

                                <CFormLabel>Periode Kuesioner <span className="text-danger">*</span></CFormLabel>
                                <CFormSelect className="mt-3" onChange={(e) => setId(Number(e.target.value))} value={id}>
                                    <option value="0">---Pilih Periode---</option>
                                    {questionnaires.map((el, i) => {
                                        return (
                                            <option key={i} value={el.id}>{el.name}</option>
                                        )
                                    })}
                                </CFormSelect>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-sm">
                                    <thead>
                                        <tr className="bg-light">
                                            <th scope="col">No</th>
                                            <th scope="col">NIP/NIK</th>
                                            <th scope="col">Nama Responden</th>
                                            <th scope="col">Status Kuesioner</th>
                                            <th scope="col">Tanggal Pengisian</th>
                                            <th scope="col">Saran</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((el, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{el.nik}</td>
                                                    <td>{el.fullname}</td>
                                                    <td>{el.is_questionnaire ? (<CBadge color="success">Selesai</CBadge>) : (<CBadge color="danger">Belum Mengisi</CBadge>)}</td>
                                                    <td>{el.date === '' ? '-' : el.date}</td>
                                                    <td>{el.suggestion === '' ? '-' : el.suggestion}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
