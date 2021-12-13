import { cilCheck, cilFingerprint, cilUser, cilVoiceOverRecord } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CRow, CCol, CWidgetStatsA, CFormLabel, CFormSelect, CCard, CCardBody, CCardHeader, } from "@coreui/react"
import { CChart, CChartLine } from "@coreui/react-chartjs"
import { useState, useEffect } from "react"
import { resultService } from "../../services"
import { IResultQuestionnaire, IChart, IDashboard } from "../../services/result"
import { toastUtil } from "../../utils"

const Index = () => {

    const [questionnaires, setQuestionnaire] = useState<IResultQuestionnaire[]>([]);
    const [charts, setChart] = useState<IChart[]>([]);
    const [dashboard, setDashboard] = useState<IDashboard>({
        total_questionnaire: 0,
        total_respondent: 0,
        total_user: 0,
        total_respondent_questionnaire: 0,
    });
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await resultService.getQuestionnaire();
                setQuestionnaire(response.data)
                let setDefault = id;
                if (setDefault === 0) {
                    setId(response.data[0].id || 0);
                }
                const response2 = await resultService.getDashboard(id);
                setDashboard(response2.data)
                const response3 = await resultService.getChart(id);
                setChart(response3.data)
            } catch (error: any) {
                toastUtil.useAlert(error.message)
            }
        };
        fetch();
    }, [id])

    return (
        <>
            <CRow>
                <CCol md={12}>
                    <h5>Dashboard</h5>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsA
                        className="mb-4"
                        color="success"
                        value={
                            <>
                                <CIcon className="" icon={cilVoiceOverRecord} />
                                {' '}{dashboard.total_respondent_questionnaire}
                            </>
                        }
                        title={`Total Responden yang sudah mengisi kuesioner di periode ini dari ${dashboard.total_respondent} Responden`}
                        chart={
                            <CChartLine
                                type="line"
                                className=""
                                style={{ height: '40px' }}
                                data={{
                                    labels: [],
                                    datasets: [],
                                }}
                            />
                        }
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsA
                        className="mb-4"
                        color="danger"
                        value={
                            <>
                                <CIcon className="" icon={cilUser} />
                                {' '}{dashboard.total_respondent}
                            </>
                        }
                        title="Total Responden"
                        chart={
                            <CChartLine
                                type="line"
                                className="mt-3"
                                style={{ height: '70px' }}
                                data={{
                                    labels: [],
                                    datasets: [],
                                }}
                            />
                        }
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsA
                        className="mb-4"
                        color="warning"
                        value={
                            <>
                                <CIcon className="" icon={cilCheck} />
                                {' '}{dashboard.total_questionnaire}
                            </>
                        }
                        title="Total Periode Kuesioner"
                        chart={
                            <CChartLine
                                type="line"
                                className="mt-3"
                                style={{ height: '70px' }}
                                data={{
                                    labels: [],
                                    datasets: [],
                                }}
                            />
                        }
                    />
                </CCol>
                <CCol sm={6} lg={3}>
                    <CWidgetStatsA
                        className="mb-4"
                        color="info"
                        value={
                            <>
                                <CIcon className="" icon={cilFingerprint} />
                                {' '}{dashboard.total_user}
                            </>
                        }
                        title="Total Pengguna"
                        chart={
                            <CChartLine
                                type="line"
                                className="mt-3"
                                style={{ height: '70px' }}
                                data={{
                                    labels: [],
                                    datasets: [],
                                }}
                            />
                        }
                    />
                </CCol>
            </CRow>
            <CRow>
                <div className="mb-3">
                    <CFormLabel>Periode Kuesioner <span className="text-danger">*</span></CFormLabel>
                    <CFormSelect onChange={(e) => setId(Number(e.target.value))} value={id}>
                        <option value="0">---Pilih Periode---</option>
                        {questionnaires.map((el, i) => {
                            return (
                                <option key={i} value={el.id}>{el.name}</option>
                            )
                        })}
                    </CFormSelect>
                </div>
            </CRow>
            <CRow>
                <CCol>
                    {charts.map((el, i) => {
                        return (
                            <CCard key={i} className="mb-3">
                                <CCardHeader>Pertanyaan {i + 1}<br />{el.description}</CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol md={3} xs={12}>
                                            <CChart
                                                type="pie"
                                                data={{
                                                    labels: el.answers.map(el => el.answer_description),
                                                    datasets: [
                                                        {
                                                            backgroundColor: ['#DD1B16', '#E46651', '#00D8FF', '#41B883'],
                                                            data: el.answers.map(el => el.total),
                                                        },
                                                    ],
                                                }}
                                            />
                                        </CCol>
                                        <CCol md={9} xs={12}>
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                    <thead className="bg-light">
                                                        <tr>
                                                            <th>Jawaban</th>
                                                            <th>Jumlah responden</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {el.answers.map((el2, i2) => {
                                                            return (
                                                                <tr key={i2}>
                                                                    <td>{el2.answer_description}</td>
                                                                    <td>{el2.total}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        )
                    })}
                </CCol>
            </CRow>
        </>
    )
}
export default Index
