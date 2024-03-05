/*
 * title : yobaMemberController.java
 * 설명 : 사용자의 RestAPI 접근을 처리하는 클래스
 * 작성자 : 박민기
 * 생성일 : 2024.02.20
 * 업데이트 : 2024.02.20
 */

package com.example.yobaMember;


import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.lang.annotation.Target;
import java.net.http.HttpRequest;
import java.util.ArrayList;
import java.util.Map;

@Controller
public class yobaMemberController {

    //요바 테이블 엔티티 매핑
    @Autowired
    yobaMemberEntity memberInfo;
    @Autowired
    yobaMemberDao dao;

    //초기 메인 페이지 접근 메소드
    @GetMapping("/")
    public String wellcome(Model model)
    {
        return "mainPage";
    }

    //로그인 처리 메소드
    @PostMapping("/user/login")
    public String loginCheck(Model model , HttpServletRequest req ,HttpSession session)
    {
        String email = req.getParameter("email");
        String password = req.getParameter("password");


        if(email.isEmpty())
        {
            model.addAttribute("ErrorMsg" , "ErrorMsg : 이메일 칸이 비어 있습니다");
            return "mainPage";
        }
        else if(password.isEmpty())
        {
            model.addAttribute("ErrorMsg" , "ErrorMsg : 비밀번호 칸이 비어 있습니다");
            return "mainPage";
        }

        yobaMemberEntity TargetMember = dao.findByEmail(email);

        if (TargetMember == null) {
            model.addAttribute("ErrorMsg", "ErrorMsg : 회원 정보가 존재하지 않습니다");
            return "mainPage";
        }

        String TargetMemberPassword = TargetMember.getPassword();

        if (!password.equals(TargetMemberPassword))
        {
            model.addAttribute("ErrorMsg" , "ErrorMsg : 패스워드가 일치 하지 않습니다");
            return "mainPage";
        }
        else {
            session.setAttribute("MemberInfo", TargetMember);
            //관리자 페이지 이동
            if(email.equals("yobamanager"))
            {
                ArrayList<yobaMemberEntity> memberList = new ArrayList<>();
                memberList = dao.loadMembers();
                model.addAttribute("Member" , memberList);
                return "managePage";
            }
            return "memberInfoPage";
        }

    }

    //로그아웃 메소드
    @GetMapping("/user/logout")
    public String logout(HttpSession session)
    {
        session.removeAttribute("MemberInfo");
        return "redirect:/";
    }


    // 회원가입 페이지 이동
    @GetMapping("/user/signup")
    public String GoSignupPage()
    {
        return "registMember";
    }

    //회원가입 DB 등록
    @PostMapping("/user/signup")
    public String completeSignup(HttpServletRequest req)
    {
        yobaMemberEntity member = new yobaMemberEntity();
        member.setName(req.getParameter("name"));
        member.setEmail(req.getParameter("email"));
        member.setPassword(req.getParameter("password"));
        member.setAddress(req.getParameter("address"));
        member.setMoney(req.getParameter("money"));
        member.setPhone(req.getParameter("phone"));
        member.setPosition(req.getParameter("position"));
        dao.registMember(member);
        return "redirect:/";
    }

    //회원 탈퇴
    @GetMapping("/getout")
    public String deleteMember(HttpSession session)
    {
        yobaMemberEntity deleteMember = (yobaMemberEntity) session.getAttribute("MemberInfo");

        int deleteId = deleteMember.getId();
        dao.deleteMember(deleteId);
        session.removeAttribute("MemberInfo");
        return "redirect:/";
    }

    //비밀 번호 체크
    @PostMapping("checkPassword")
    public ResponseEntity<Boolean> checkPassword(@RequestBody Map<String, String> request , HttpSession session)
    {
        String password = request.get("password");
        yobaMemberEntity member = (yobaMemberEntity) session.getAttribute("MemberInfo");

        if(password.equals(member.getPassword())) {
            return ResponseEntity.ok(true); // 비밀번호 일치
        } else {
            return ResponseEntity.ok(false); // 비밀번호 불일치
        }
    }

    //월급 정산 페이지 이동
    @GetMapping("/sendsalary")
    public String gosalarypage()
    {
        return "salaryPage";
    }

    //월급 양식 페이지 이동
    @GetMapping("/exsalary")
    public String goexsalary()
    {
        return "exsalaryPage";
    }

    //룸배치 페이지 이동
    @GetMapping("/roominfo")
    public String goRoominfo(){return "roominfo";}



}