import { AxiosRequestConfig } from 'axios';
import { useState } from 'react'
import { Header, Navbar } from '../../components/home'
import { authService, questionnaireRespondentService, questionService } from '../../services';
import { instance } from '../../services/instances';
import { IQuestion } from '../../services/question';
import { toastUtil } from '../../utils';

export default function Index(props: any) {

    const [nik, setNik] = useState('')
    const [obj, setObj] = useState<any>(null);
    const [disabled, setDisabled] = useState(false);
    const [disabledText, setDisabledText] = useState('Submit');
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [respondentId, setRespondentId] = useState<any>(null);
    const [token, setToken] = useState<any>(null);

    const getRespondent = async () => {
        if (nik === '') return toastUtil.useAlert('NIP/NIK tidak boleh kosong', 'error')
        try {
            const response = await authService.loginRespondent({ nik });
            setObj(response.data)
            setRespondentId(response.data.respondent_id)
            setToken(response.data.access_token)

            // get questions
            instance.interceptors.request.use((config: AxiosRequestConfig) => {
                config.headers = {
                    Authorization: `Bearer ${response.data.access_token}`
                }
                return config;
            });
            const response2 = await questionService.get({})
            setQuestions(response2.data)
        } catch (error: any) {
            setObj(null)
            setRespondentId(null)
            setToken(null)
            toastUtil.useAlert(error.response.data.message || error.message)
        }
    }

    const handleInput = async (e: any) => {
        e.preventDefault();
        try {
            const suggestion = e.target.suggestion.value;
            if (suggestion === '') return toastUtil.useAlert('Saran wajib di isi', 'error')
            const answers = []
            for (let i = 0; i < questions.length; i++) {
                let choose = e.target[`answer_${i}`].value
                if (choose !== '') {
                    answers.push({
                        question_answer: Number(choose)
                    })
                }
            }
            if (answers.length === 0) return toastUtil.useAlert('Pilih jawaban terlebih dahulu', 'error')
            if (answers.length !== questions.length) return toastUtil.useAlert('Jawaban tidak boleh ada yang kosong', 'error')
            const formData = { respondent_id: respondentId, suggestion, answers }

            instance.interceptors.request.use((config: AxiosRequestConfig) => {
                config.headers = {
                    Authorization: `Bearer ${token}`
                }
                return config;
            });
            setDisabled(true)
            setDisabledText('Memproses...')
            await questionnaireRespondentService.create(formData)
            setNik('')
            setObj(null)
            setRespondentId(null)
            setToken(null)
            toastUtil.useAlert('Berhasil mengirimkan jawaban', 'success')
            setDisabled(false)
            setDisabledText('Submit')
            props.history.push('/')
        } catch (error: any) {
            toastUtil.useAlert(error.response.data.message || error.message)
            setDisabled(false)
            setDisabledText('Submit')

        }
    }


    return (
        <>
            <Navbar />
            <div className="container p-5">
                <Header />
                <div className="card">
                    <h5 className="card-header">Identitas Responden</h5>
                    <div className="card-body">
                        <div className="form-group mb-3">
                            <label className="mb-2">NIP / NIK</label>
                            <input type="text" className="form-control" placeholder="Masukkan NIP atau NIK anda yang sudah terdaftar..." autoComplete="off" autoFocus onChange={(e) => setNik(e.target.value)} value={nik} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success text-white" onClick={() => getRespondent()}>Cek Data</button>
                        </div>
                        <hr />
                        {obj && <div>
                            <div className="form-group mb-3">
                                <label className="mb-2">Nama Lengkap</label>
                                <input type="text" className="form-control" readOnly value={obj?.fullname || ''} />
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Jenis Kelamin</label>
                                        <input type="text" className="form-control" readOnly value={obj?.gender || ''} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Pendidikan</label>
                                        <input type="text" className="form-control" readOnly value={obj?.education || ''} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Status Pekerjaan</label>
                                        <input type="text" className="form-control" readOnly value={obj?.job_status || ''} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group mb-3">
                                        <label className="mb-2">Jabatan Pekerjaan</label>
                                        <input type="text" className="form-control" readOnly value={obj?.job_title || ''} />
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>

                {obj && <div className="element">
                    <form onSubmit={handleInput}>
                        <div className="card mt-3">
                            <h5 className="card-header">Berikan penilaian Anda terhadap kualitas pelayanan berdasarkan parameter di bawah ini.</h5>
                            <div className="card-body">

                                {/* Loop Data */}
                                {questions.map((el, i) => {
                                    return (
                                        <div key={i} className="mb-4">
                                            <h5 className="card-title">{i + 1}. {el.question_category.name}</h5>
                                            <p className="card-text">{el.description}</p>
                                            <div className="row">
                                                {/* Loop Answers */}
                                                {el.answers.map((el2, i2) => {
                                                    return (<div className="col-sm-12 col-md-3" key={i2}>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name={`answer_${i}`} value={el2.id} id={`choose${el2.id}`} />

                                                            <label className="form-check-label" htmlFor={`choose${el2.id}`}>
                                                                {el2.index_code.toUpperCase()}. {el2.index_name}
                                                            </label>
                                                        </div>
                                                    </div>)
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}

                                {/* Saran Kiritik */}
                                <hr />
                                <div className="form-group mb-3 mt-3">
                                    <h5 className="card-title">Saran <span className="text-danger">*</span></h5>
                                    <textarea name="suggestion" className="form-control" placeholder="Masukan saran anda" id=""></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button className="btn btn-danger text-white" type="submit" disabled={disabled}>{disabledText}</button>
                        </div>
                    </form>
                </div>}
            </div>
        </>
    )
}
