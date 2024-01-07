import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Events from './Components/Events/Events';
import SideBar from './Components/Common/SideBar/SideBar';
import Careers from './Components/Careers/Careers';

function App() {
  return (
    <BrowserRouter>
      <div className="font-poppins w-screen overflow-clip no-vertical-scroll">
        
        <SideBar />

        <div className="ml-[50px] mt-[80px]">
          <Routes>
            <Route path="/Events" element={<Events />} />
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
