
import illustration from '../assets/illustration.png';

function LeftSection() {
    return (
        <div className="left">
            <h1>TaxPal</h1>
            <p>Personal Finance & Tax Estimator for Freelancers</p>

            <img
                src={illustration}
                alt="Tax Illustration"
                className="illustration"
            />
        </div>
    );
}

export default LeftSection;
