import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.svg",
        label: "Home",
        href: "/admin",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/user.svg",
        label: "Administradores",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/users.svg",
        label: "Usuarios",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/box.svg",
        label: "Productos",
        href: "/list/parents",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/cash.svg",
        label: "Ingresos",
        href: "/list/subjects",
        visible: ["admin"],
      },
      {
        icon: "/flag.svg",
        label: "Reportes",
        href: "/list/classes",
        visible: ["admin", "teacher"],
      },
      
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/account.svg",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/settings.svg",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.svg",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {  
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={25} height={25} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
