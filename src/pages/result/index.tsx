import { CFormLabel, CFormSelect } from "@coreui/react";
import { useEffect, useState } from "react";
import { Header, Navbar } from "../../components/home";
import { resultService } from "../../services";
import { IResult, IResultQuestionnaire } from "../../services/result";
import { toastUtil } from "../../utils";


export default function Index() {

    const [questionnaires, setQuestionnaire] = useState<IResultQuestionnaire[]>([]);
    const [result, setResult] = useState<IResult | null>(null);
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await resultService.getQuestionnaire();
                setQuestionnaire(response.data)
                const response2 = await resultService.getResult(id);
                setResult(response2.data)
            } catch (error: any) {
                toastUtil.useAlert(error.message)
            }
        };
        fetch();
    }, [id])

    return (
        <>
            <Navbar />
            <div className="container p-5">
                <Header />
                <div className="card">
                    <h5 className="card-header">HASIL PENGOLAHAN SURVEY KEPUASAN MASYARAKAT</h5>
                    <div className="card-body">
                        <div className="mb-3">
                            <CFormLabel>Periode Kuesioner <span className="text-danger">*</span></CFormLabel>
                            <CFormSelect onChange={(e) => setId(Number(e.target.value))}>
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
                                    <tr className="bg-success">
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
                    </div>
                </div>
            </div>
        </>
    )
}
