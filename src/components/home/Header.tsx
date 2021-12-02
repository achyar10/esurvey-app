import { Link } from 'react-router-dom';
import Banner from '../../assets/images/banner.jpeg';

export const Header = () => {
    return (
        <>
            <div className="row justify-content-center mb-5">
                <div className="col-md-4 col-sm-12">
                    <img src={Banner} width="100%" alt="banner" />
                </div>
                <div className="col-md-8 col-sm-12 mt-5">
                    <h1 className="mb-3">
                        E-Survey BPI KEMENDESA
                    </h1>
                    <p className="">Bantu kami mewujudkan dan mempertahankan <b>Wilayah
                        Bebas Korupsi</b> dan <b>Wilayah Birokrasi Bersih dan Melayani</b> <br />
                        Survei yang dilakukan mengacu pada Peraturan Menteri Pendayagunaan Aparatur Negara dan Reformasi Birokrasi Nomor 16 Tahun 2014 Tentang Pedoman Survei Kepuasan Masyarakat Terhadap Penyelenggaraan Pelayanan Publik.
                    </p>
                </div>
            </div>
            <Link className="btn btn-primary text-white" to="/">Form Survey</Link>
            <Link className="btn btn-info text-white float-end" to="/result">Hasil</Link>
            <hr />
        </>
    )
}
