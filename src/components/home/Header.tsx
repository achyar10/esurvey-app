import { Link } from 'react-router-dom';
import Banner from '../../assets/images/banner.jpeg';
// import Logo2 from '../../assets/brand/logo_sisuka2.png';
import Logo from '../../assets/brand/logo_sisuka.png';

export const Header = () => {
    return (
        <>
            <div className="row justify-content-center mb-5">
                <div className="col-md-4 col-sm-12">
                    <img src={Banner} width="100%" alt="banner" className="mt-5 d-none d-sm-block" />
                </div>
                <div className="col-md-8 col-sm-12 mt-5">
                    <div className="text-center">
                        <img src={Logo} alt="logo" height="70" />
                    </div>
                    <h3 className="mb-2 mt-2 text-center">
                        "SISTEM INFORMASI SURVEY KEPUASAN LAYANAN"
                    </h3>
                    <p className="">Bantu kami mewujudkan <b>Wilayah
                        Bebas Korupsi</b> dan <b>Wilayah Birokrasi Bersih</b> dan Melayani melalui peningkatan kualitas pelayanan publik <br />
                        Survey ini diselenggarakan dengan mengacu pada Peraturan Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi Nomor 14 Tahun 2017 tentang Pedoman Penyusunan Survei Kepuasan Masyarakat Unit Penyelenggara Pelayanan Publik.
                    </p>
                </div>
            </div>
            <Link className="btn btn-primary text-white" to="/survey">Form Survey</Link>
            <Link className="btn btn-info text-white float-end" to="/">Hasil</Link>
            <hr />
        </>
    )
}
