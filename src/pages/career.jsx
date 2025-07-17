import { useState } from "react";
import { careers } from "../data/careers";

export default function Careers() {
  const [selectedDept, setSelectedDept] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleDeptChange = (e) => {
    const deptName = e.target.value;
    setSelectedDept(deptName);
    setSelectedRole(null);
    const dept = careers.find((item) => item.name === deptName);
    if (dept) {
      setRoles(dept.data);
      setSelectedRole(null);
    } else {
      setRoles([]);
    }
  };

  return (
    <>
      {/* Banner */}
      <div className="relative h-[40vh]">
        <img
          src="images/banner.jpg"
          alt="About background"
          className="absolute inset-0 w-full h-full object-cover object-[center_70%] z-0"
        />
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="relative z-20 h-full flex items-start justify-start p-8">
          <h1 className="text-white mt-10 text-4xl md:text-6xl font-bold drop-shadow-xl">
            Careers at LogiXJunction
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-lxj-softWhite">
      <div className="p-8 bg-lxj-softWhite min-h-screen flex flex-col max-w-6xl mx-auto font-inter">


        {/* Intro */}
        <div className="bg-white border-2 border-zinc-200 p-6 rounded-2xl shadow-md text-gray-800 text-lg leading-relaxed mb-10">
          <div className="columns-1 md:columns-2 gap-6 space-y-4">
            <p>
            At <span className="font-semibold text-lxj-accent">LogiX<span className="text-lxj-alert">Junction</span></span>, every team is essential to transforming India’s freight logistics ecosystem. We believe that solving complex logistics challenges requires collaboration across functions — from engineering and operations to customer success and strategic growth. Our work is rooted in solving real-world pain points for transporters, shippers, and logistics operators across the country.
            </p>
            <p>
            Whether you're building scalable backend systems, designing intuitive user interfaces, or coordinating shipments on the ground, your contributions help streamline the movement of goods across India. We focus on making logistics smarter, faster, and more transparent — powered by data, technology, and a relentless commitment to innovation.
            </p>
            <p>
            Joining <span className="font-semibold text-lxj-accent">LogiX<span className="text-lxj-alert">Junction</span></span> means stepping into a dynamic, fast-paced environment where ideas turn into action and action drives real impact. As a mission-driven company, we value ownership, curiosity, and adaptability. You won’t just be doing a job — you’ll be part of a purpose-led journey to modernize one of the most crucial sectors of the Indian economy.
            </p>
            <p>
            No matter your role or experience level, you’ll have the freedom to experiment, learn, and grow. We provide the tools, mentorship, and flexibility needed to help you succeed — whether you're writing code, running campaigns, or supporting customers. At <span className="font-semibold text-lxj-accent">LogiX<span className="text-lxj-alert">Junction</span></span>, we’re not just building a logistics company — we’re building the future of freight.
            </p>
          </div>
        </div>


        {/* Dropdowns */}
        <form className="flex flex-col items-center gap-4 mx-auto">
          <select
            className="px-4 py-3 w-[38vh] text-center border border-zinc-200 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150 ease-in-out bg-lxj-accent text-white"
          >
            <option value="">Select a State</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Delhi">Delhi</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="West Bengal">West Bengal</option>
          </select>


          <select
            className="px-4 py-3 w-[38vh] text-center border border-zinc-200 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150 ease-in-out bg-lxj-alert text-white"
            onChange={handleDeptChange}
            value={selectedDept}
          >
            <option value="">Select a department</option>
            {careers.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          {roles.length > 0 && (
            <select
            className="px-4 py-3 w-[38vh] text-center border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-150 ease-in-out bg-lxj-primary text-white"
            onChange={(e) => {
                const roleName = e.target.value;
                const role = roles.find((r) => r.name === roleName);
                setSelectedRole(role);
              }}
              value={selectedRole?.name || ""}
            >
              <option value="">Select a role</option>
              {roles.map((role, idx) => (
                <option key={idx} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          )}
        </form>

        {/* Role Info Card */}
        {selectedRole && (
          <div className="mt-12 p-8 bg-white border-2 border-gray-200 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-lxj-primary mb-4">{selectedRole.name}</h2>

            <div className="space-y-3 mb-6 text-gray-800 text-base">
              {selectedRole.description.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>

            <h3 className="text-2xl font-semibold text-lxj-alert mb-3">Roles & Responsibilities</h3>
            <ul className="list-disc list-inside text-gray-900 space-y-1">
              {selectedRole.role.map((item, index) => (
                <li key={index} className="pl-1">{item}</li>
              ))}
            </ul>
            <h3 className="text-2xl font-semibold text-lxj-alert mt-6 mb-3">Requirments</h3>
            <ul className="list-disc list-inside text-gray-900 space-y-1">
              {selectedRole.requirement.map((item, index) => (
                <li key={index} className="pl-1">{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
