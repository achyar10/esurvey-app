import Logo from '../../assets/brand/logo-bpi.png';

export const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container-fluid">
                    <span className="navbar-brand">
                        <img src={Logo} height="50" alt="logo" />
                        E-Survei BPI
                        </span>
                </div>
            </nav>
        </>
    )
}
