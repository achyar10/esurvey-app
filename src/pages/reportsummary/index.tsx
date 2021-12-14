import { CRow, CCol, CCard, CSpinner, CCardBody, CFormLabel, CFormSelect, CButton } from "@coreui/react";
import { useState, useEffect } from "react";
import { resultService } from "../../services";
import { IResultQuestionnaire, IResult } from "../../services/result";
import { toastUtil } from "../../utils";
import ReactExport from 'react-data-export';
import CIcon from "@coreui/icons-react";
import { cilSpreadsheet } from "@coreui/icons";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default function Index() {

    const [questionnaires, setQuestionnaire] = useState<IResultQuestionnaire[]>([]);
    const [result, setResult] = useState<IResult | null>(null);
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
                const response2 = await resultService.getResult(id);
                setResult(response2.data)
            } catch (error: any) {
                toastUtil.useAlert(error.message)
            }
            setLoading(false);
        };
        fetch();
    }, [id])

    const data = result?.details.map((el, i) => {
        return [
            { value: i + 1 },
            { value: el.category_name || '' },
            { value: el.total_respondent || '' },
            { value: el.total_value || '' },
            { value: el.average || '' },
        ]
    })

    const data2 = [
        [
            { value: `IKM UNIT PELAYANAN : ${result?.skm === 'NaN' ? 0 : result?.skm}` },
        ]
    ]

    const DataSet = [
        {
            columns: [
                { title: "NO" },
                { title: "UNSUR PELAYANAN" },
                { title: "JUMLAH RESPONDEN" },
                { title: "TOTAL NILAI" },
                { title: "RATA RATA" },

            ],
            data: data?.concat(data2)
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
                                    filename={`Summary_Report_${new Date().getTime()}`}
                                    element={<CButton color="success" className="btn d-block text-white float-end" type="button"> <CIcon icon={cilSpreadsheet} /> Export Excel</CButton>}>
                                    <ExcelSheet dataSet={DataSet} name="Ringkasan Laporan" />
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
                                <table className="table table-bordered">
                                    <thead>
                                        <tr className="bg-light">
                                            <th scope="col">No</th>
                                            <th scope="col">Unsur Pelayanan</th>
                                            <th scope="col" className="text-center">Jumlah Responden</th>
                                            <th scope="col" className="text-center">Total Nilai</th>
                                            <th scope="col" className="text-center">Rata Rata</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result?.details.map((el, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{el.category_name}</td>
                                                    <td className="text-center">{el.total_respondent}</td>
                                                    <td className="text-center">{el.total_value}</td>
                                                    <td className="text-center">{el.average === 'NaN' ? 0 : el.average}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr className="bg-info">
                                            <td colSpan={5} className="fw-bold text-white text-center">IKM UNIT PELAYANAN : {result?.skm === 'NaN' ? 0 : result?.skm}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h6>Mutu Pelayanan</h6>
                                <div className="row">
                                    <div className="col-md-3 col-sm-12">
                                        <table width="100%">
                                            <thead>
                                                <tr>
                                                    <td><span className="fw-bold">A</span> (Sangat Baik)</td>
                                                    <td>:</td>
                                                    <td>88,31 - 100,00</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="fw-bold">B</span> (Baik)</td>
                                                    <td>:</td>
                                                    <td>76,61 - 88,30</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="fw-bold">C</span> (Kurang Baik)</td>
                                                    <td>:</td>
                                                    <td>65,00 - 76,60</td>
                                                </tr>
                                                <tr>
                                                    <td><span className="fw-bold">D</span> (Tidak Baik)</td>
                                                    <td>:</td>
                                                    <td>25,00 - 64,99</td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
